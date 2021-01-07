/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "Connection.h"

#include <cstdlib>
#include <mutex>

#include <folly/Conv.h>
#include <folly/Executor.h>
#include <folly/Function.h>
//#include <glog/logging.h>
#include <hermes/inspector/Inspector.h>
#include <hermes/inspector/chrome/MessageConverters.h>
#include <hermes/inspector/chrome/RemoteObjectsTable.h>
#include <hermes/inspector/detail/CallbackOStream.h>
#include <hermes/inspector/detail/SerialExecutor.h>
#include <hermes/inspector/detail/Thread.h>
#include <jsi/instrumentation.h>

#include "OnLoad.h"

namespace facebook {
namespace hermes {
namespace inspector {
namespace chrome {

using ::facebook::react::ILocalConnection;
using ::facebook::react::IRemoteConnection;
using ::folly::Unit;

namespace debugger = ::facebook::hermes::debugger;
namespace inspector = ::facebook::hermes::inspector;
namespace m = ::facebook::hermes::inspector::chrome::message;

/*
 * Connection::Impl
 */

class Connection::Impl : public inspector::InspectorObserver,
                         public message::RequestHandler {
 public:
  Impl(
      std::unique_ptr<RuntimeAdapter> adapter,
      const std::string &title,
      bool waitForDebugger);
  ~Impl();

  jsi::Runtime &getRuntime();
  std::string getTitle() const;

  bool connect(std::unique_ptr<IRemoteConnection> remoteConn);
  bool disconnect();
  void sendMessage(std::string str);

  /* InspectorObserver overrides */
  void onBreakpointResolved(
      Inspector &inspector,
      const debugger::BreakpointInfo &info) override;
  void onContextCreated(Inspector &inspector) override;
  void onPause(Inspector &inspector, const debugger::ProgramState &state)
      override;
  void onResume(Inspector &inspector) override;
  void onScriptParsed(Inspector &inspector, const ScriptInfo &info) override;
  void onMessageAdded(Inspector &inspector, const ConsoleMessageInfo &info)
      override;

  /* RequestHandler overrides */
  void handle(const m::UnknownRequest &req) override;
  void handle(const m::debugger::DisableRequest &req) override;
  void handle(const m::debugger::EnableRequest &req) override;
  void handle(const m::debugger::EvaluateOnCallFrameRequest &req) override;
  void handle(const m::debugger::PauseRequest &req) override;
  void handle(const m::debugger::RemoveBreakpointRequest &req) override;
  void handle(const m::debugger::ResumeRequest &req) override;
  void handle(const m::debugger::SetBreakpointRequest &req) override;
  void handle(const m::debugger::SetBreakpointByUrlRequest &req) override;
  void handle(const m::debugger::SetPauseOnExceptionsRequest &req) override;
  void handle(const m::debugger::StepIntoRequest &req) override;
  void handle(const m::debugger::StepOutRequest &req) override;
  void handle(const m::debugger::StepOverRequest &req) override;
  void handle(const m::heapProfiler::TakeHeapSnapshotRequest &req) override;
  void handle(
      const m::heapProfiler::StartTrackingHeapObjectsRequest &req) override;
  void handle(
      const m::heapProfiler::StopTrackingHeapObjectsRequest &req) override;
  void handle(const m::runtime::EvaluateRequest &req) override;
  void handle(const m::runtime::GetPropertiesRequest &req) override;

 private:
  std::vector<m::runtime::PropertyDescriptor> makePropsFromScope(
      std::pair<uint32_t, uint32_t> frameAndScopeIndex,
      const std::string &objectGroup,
      const debugger::ProgramState &state);
  std::vector<m::runtime::PropertyDescriptor> makePropsFromValue(
      const jsi::Value &value,
      const std::string &objectGroup,
      bool onlyOwnProperties);

  void sendSnapshot(
      int reqId,
      std::string message,
      bool reportProgress,
      bool stopStackTraceCapture);
  void sendToClient(const std::string &str);
  void sendResponseToClient(const m::Response &resp);
  void sendNotificationToClient(const m::Notification &resp);
  folly::Function<void(const std::exception &)> sendErrorToClient(int id);
  void sendResponseToClientViaExecutor(int id);
  void sendResponseToClientViaExecutor(folly::Future<Unit> future, int id);
  void sendNotificationToClientViaExecutor(const m::Notification &note);
  void sendErrorToClientViaExecutor(int id, const std::string &error);

  std::shared_ptr<RuntimeAdapter> runtimeAdapter_;
  std::string title_;

  // connected_ is protected by connectionMutex_.
  std::mutex connectionMutex_;
  bool connected_;

  // parsedScripts_ list stores file names of all scripts that have been
  // parsed so that we could find script's file name by regex.
  // This is similar to Inspector's loadedScripts_ map but we want to
  // store this info here because searching file name that matches
  // given regex (on setBreakpointByUrl command) is more related to Chrome
  // protocol than to Hermes inspector.
  // Access is protected by parsedScriptsMutex_.
  std::mutex parsedScriptsMutex_;
  std::vector<std::string> parsedScripts_;

  // The rest of these member variables are only accessed via executor_.
  std::unique_ptr<folly::Executor> executor_;
  std::unique_ptr<IRemoteConnection> remoteConn_;
  std::shared_ptr<inspector::Inspector> inspector_;

  // objTable_ is protected by the inspector lock. It should only be accessed
  // when the VM is paused, e.g. in an InspectorObserver callback or in an
  // executeIfEnabled callback.
  RemoteObjectsTable objTable_;
};

Connection::Impl::Impl(
    std::unique_ptr<RuntimeAdapter> adapter,
    const std::string &title,
    bool waitForDebugger)
    : runtimeAdapter_(std::move(adapter)),
      title_(title),
      connected_(false),
      executor_(std::make_unique<inspector::detail::SerialExecutor>(
          "hermes-chrome-inspector-conn")),
      remoteConn_(nullptr),
      inspector_(std::make_shared<inspector::Inspector>(
          runtimeAdapter_,
          *this,
          waitForDebugger)) {
  inspector_->installLogHandler();
}

Connection::Impl::~Impl() = default;

jsi::Runtime &Connection::Impl::getRuntime() {
  return runtimeAdapter_->getRuntime();
}

std::string Connection::Impl::getTitle() const {
  return title_;
}

bool Connection::Impl::connect(std::unique_ptr<IRemoteConnection> remoteConn) {
  assert(remoteConn);
  std::lock_guard<std::mutex> lock(connectionMutex_);

  if (connected_) {
    return false;
  }

  connected_ = true;
  executor_->add([this, remoteConn = std::move(remoteConn)]() mutable {
    remoteConn_ = std::move(remoteConn);
  });

  return true;
}

bool Connection::Impl::disconnect() {
  std::lock_guard<std::mutex> lock(connectionMutex_);

  if (!connected_) {
    return false;
  }

  connected_ = false;

  inspector_->disable().via(executor_.get()).thenValue([this](auto &&) {
    // HACK:  We purposely call RemoteConnection::onDisconnect on a *different*
    // rather than on this thread (the executor thread). This is to prevent this
    // scenario:
    //
    // 1. RemoteConnection::onDisconnect runs on the executor thread
    // 2. onDisconnect through a long chain of calls causes the Connection
    //    destructor to run
    // 3. The Connection destructor causes the SerialExecutor destructor to run.
    // 4. The SerialExecutor destructor waits for all outstanding work items to
    //    finish via a call to join().
    // 5. join() fails, since the executor thread is trying to join against
    //    itself.
    //
    // To prevent this chain of events, we always call onDisconnect on a
    // different thread.
    //
    // See P59135203 for an example stack trace.
    //
    // One more hack: we use release() and delete instead of unique_ptr because
    // detail::Thread expects a std::function, and std::function cannot capture
    // move-only types like unique_ptr.
    auto conn = remoteConn_.release();
    inspector::detail::Thread disconnectLaterThread{
        "hermes-chrome-inspector-conn-disconnect", [conn] {
          conn->onDisconnect();
          delete conn;
        }};
    disconnectLaterThread.detach();
  });

  return true;
}

void Connection::Impl::sendMessage(std::string str) {
  executor_->add([this, str = std::move(str)]() mutable {
    folly::Try<std::unique_ptr<m::Request>> maybeReq =
        m::Request::fromJson(str);

      LOGD("**** impl::sendMessage: %s", str.c_str());
    if (maybeReq.hasException()) {
//      LOG(ERROR) << "Invalid request `" << str
//                 << "`: " << maybeReq.exception().what();
      LOGD("**** Invalid request: %s, exp: %s", str.c_str(), maybeReq.exception().what().c_str());
      return;
    }

    auto &req = maybeReq.value();
    if (req) {
      req->accept(*this);
    }
  });
}

/*
 * InspectorObserver overrides
 */

void Connection::Impl::onBreakpointResolved(
    Inspector &inspector,
    const debugger::BreakpointInfo &info) {
  m::debugger::BreakpointResolvedNotification note;
  note.breakpointId = folly::to<std::string>(info.id);
  note.location = m::debugger::makeLocation(info.resolvedLocation);
  sendNotificationToClientViaExecutor(note);
}

void Connection::Impl::onContextCreated(Inspector &inspector) {
  // Right now, Hermes only has the notion of one JS context per VM instance,
  // so we just always name the single JS context with id=1 and name=hermes.
  m::runtime::ExecutionContextCreatedNotification note;
  note.context.id = 1;
  note.context.name = "hermes";

  sendNotificationToClientViaExecutor(note);
}

void Connection::Impl::onPause(
    Inspector &inspector,
    const debugger::ProgramState &state) {
  m::debugger::PausedNotification note;
  note.callFrames = m::debugger::makeCallFrames(state, objTable_, getRuntime());

  switch (state.getPauseReason()) {
    case debugger::PauseReason::Breakpoint:
      // use other, chrome protocol has no reason specifically for breakpoints
      note.reason = "other";

// TODO: hermes hasn't implemented ProgramState::getBreakpoint yet
#if HERMES_SUPPORTS_STATE_GET_BREAKPOINT
      note.hitBreakpoints = std::vector<m::debugger::BreakpointId>();
      note.hitBreakpoints->emplace_back(
          folly::to<std::string>(state.getBreakpoint()));
#endif

      break;
    case debugger::PauseReason::Exception:
      note.reason = "exception";
      break;
    default:
      note.reason = "other";
      break;
  }

  sendNotificationToClientViaExecutor(note);
}

void Connection::Impl::onResume(Inspector &inspector) {
  objTable_.releaseObjectGroup(BacktraceObjectGroup);

  m::debugger::ResumedNotification note;
  sendNotificationToClientViaExecutor(note);
}

void Connection::Impl::onScriptParsed(
    Inspector &inspector,
    const ScriptInfo &info) {
  m::debugger::ScriptParsedNotification note;
  note.scriptId = folly::to<std::string>(info.fileId);
  note.url = info.fileName;

  if (!info.sourceMappingUrl.empty()) {
    note.sourceMapURL = info.sourceMappingUrl;
  }

  {
    std::lock_guard<std::mutex> lock(parsedScriptsMutex_);
    parsedScripts_.push_back(info.fileName);
  }

  sendNotificationToClientViaExecutor(note);
}

void Connection::Impl::onMessageAdded(
    facebook::hermes::inspector::Inspector &inspector,
    const ConsoleMessageInfo &info) {
  m::runtime::ConsoleAPICalledNotification apiCalledNote;
  apiCalledNote.type = info.level;

  size_t argsSize = info.args.size(getRuntime());
  for (size_t index = 0; index < argsSize; ++index) {
    apiCalledNote.args.push_back(m::runtime::makeRemoteObject(
        getRuntime(),
        info.args.getValueAtIndex(getRuntime(), index),
        objTable_,
        "ConsoleObjectGroup"));
  }

  sendNotificationToClientViaExecutor(apiCalledNote);
}

/*
 * RequestHandler overrides
 */

void Connection::Impl::handle(const m::UnknownRequest &req) {
//  LOG(INFO) << "responding ok to unknown request: " << req.toDynamic();
  sendResponseToClientViaExecutor(req.id);
}

void Connection::Impl::handle(const m::debugger::DisableRequest &req) {
  sendResponseToClientViaExecutor(inspector_->disable(), req.id);
}

void Connection::Impl::handle(const m::debugger::EnableRequest &req) {
  sendResponseToClientViaExecutor(inspector_->enable(), req.id);
}

void Connection::Impl::handle(
    const m::debugger::EvaluateOnCallFrameRequest &req) {
  auto remoteObjPtr = std::make_shared<m::runtime::RemoteObject>();

  inspector_
      ->evaluate(
          atoi(req.callFrameId.c_str()),
          req.expression,
          [this,
           remoteObjPtr,
           objectGroup = req.objectGroup,
           byValue = req.returnByValue.value_or(false)](
              const facebook::hermes::debugger::EvalResult
                  &evalResult) mutable {
            *remoteObjPtr = m::runtime::makeRemoteObject(
                getRuntime(),
                evalResult.value,
                objTable_,
                objectGroup.value_or(""),
                byValue);
          })
      .via(executor_.get())
      .thenValue(
          [this, id = req.id, remoteObjPtr](debugger::EvalResult result) {
            m::debugger::EvaluateOnCallFrameResponse resp;
            resp.id = id;

            if (result.isException) {
              resp.exceptionDetails =
                  m::runtime::makeExceptionDetails(result.exceptionDetails);
            } else {
              resp.result = *remoteObjPtr;
            }

            sendResponseToClient(resp);
          })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

void Connection::Impl::sendSnapshot(
    int reqId,
    std::string message,
    bool reportProgress,
    bool stopStackTraceCapture) {
  inspector_
      ->executeIfEnabled(
          message,
          [this, reportProgress, stopStackTraceCapture](
              const debugger::ProgramState &) {
            if (reportProgress) {
              // A progress notification with finished = true indicates the
              // snapshot has been captured and is ready to be sent.  Our
              // implementation streams the snapshot as it is being captured, so
              // we must send this notification first.
              m::heapProfiler::ReportHeapSnapshotProgressNotification note;
              note.done = 1;
              note.total = 1;
              note.finished = true;
              sendNotificationToClient(note);
            }

            // Size picked to conform to Chrome's own implementation, at the
            // time of writing.
            inspector::detail::CallbackOStream cos(
                /* sz */ 100 << 10, [this](std::string s) {
                  m::heapProfiler::AddHeapSnapshotChunkNotification note;
                  note.chunk = std::move(s);
                  sendNotificationToClient(note);
                  return true;
                });

            getRuntime().instrumentation().createSnapshotToStream(cos);
            if (stopStackTraceCapture) {
              getRuntime()
                  .instrumentation()
                  .stopTrackingHeapObjectStackTraces();
            }
          })
      .via(executor_.get())
      .thenValue([this, reqId](auto &&) {
        sendResponseToClient(m::makeOkResponse(reqId));
      })
      .thenError<std::exception>(sendErrorToClient(reqId));
}

void Connection::Impl::handle(
    const m::heapProfiler::TakeHeapSnapshotRequest &req) {
  sendSnapshot(
      req.id,
      "HeapSnapshot.takeHeapSnapshot",
      req.reportProgress && *req.reportProgress,
      /* stopStackTraceCapture */ false);
}

void Connection::Impl::handle(
    const m::heapProfiler::StartTrackingHeapObjectsRequest &req) {
  const auto id = req.id;

  inspector_
      ->executeIfEnabled(
          "HeapProfiler.startTrackingHeapObjects",
          [this](const debugger::ProgramState &) {
            getRuntime().instrumentation().startTrackingHeapObjectStackTraces();
          })
      .via(executor_.get())
      .thenValue(
          [this, id](auto &&) { sendResponseToClient(m::makeOkResponse(id)); })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

void Connection::Impl::handle(
    const m::heapProfiler::StopTrackingHeapObjectsRequest &req) {
  sendSnapshot(
      req.id,
      "HeapSnapshot.takeHeapSnapshot",
      req.reportProgress && *req.reportProgress,
      /* stopStackTraceCapture */ true);
}

void Connection::Impl::handle(const m::runtime::EvaluateRequest &req) {
  auto remoteObjPtr = std::make_shared<m::runtime::RemoteObject>();

  inspector_
      ->evaluate(
          0, // Top of the stackframe
          req.expression,
          [this,
           remoteObjPtr,
           objectGroup = req.objectGroup,
           byValue = req.returnByValue.value_or(false)](
              const facebook::hermes::debugger::EvalResult
                  &evalResult) mutable {
            *remoteObjPtr = m::runtime::makeRemoteObject(
                getRuntime(),
                evalResult.value,
                objTable_,
                objectGroup.value_or("ConsoleObjectGroup"),
                byValue);
          })
      .via(executor_.get())
      .thenValue(
          [this, id = req.id, remoteObjPtr](debugger::EvalResult result) {
            m::debugger::EvaluateOnCallFrameResponse resp;
            resp.id = id;

            if (result.isException) {
              resp.exceptionDetails =
                  m::runtime::makeExceptionDetails(result.exceptionDetails);
            } else {
              resp.result = *remoteObjPtr;
            }

            sendResponseToClient(resp);
          })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

void Connection::Impl::handle(const m::debugger::PauseRequest &req) {
  sendResponseToClientViaExecutor(inspector_->pause(), req.id);
}

void Connection::Impl::handle(const m::debugger::RemoveBreakpointRequest &req) {
  auto breakpointId = folly::to<debugger::BreakpointID>(req.breakpointId);
  sendResponseToClientViaExecutor(
      inspector_->removeBreakpoint(breakpointId), req.id);
}

void Connection::Impl::handle(const m::debugger::ResumeRequest &req) {
  sendResponseToClientViaExecutor(inspector_->resume(), req.id);
}

void Connection::Impl::handle(const m::debugger::SetBreakpointRequest &req) {
  debugger::SourceLocation loc;

  auto scriptId = folly::tryTo<unsigned int>(req.location.scriptId);
  if (!scriptId) {
    sendErrorToClientViaExecutor(
        req.id, "Expected integer scriptId: " + req.location.scriptId);
    return;
  }

  loc.fileId = scriptId.value();
  // CDP Locations are 0-based, Hermes lines/columns are 1-based
  loc.line = req.location.lineNumber + 1;
  if (req.location.columnNumber) {
    loc.column = req.location.columnNumber.value() + 1;
  }

  inspector_->setBreakpoint(loc, req.condition)
      .via(executor_.get())
      .thenValue([this, id = req.id](debugger::BreakpointInfo info) {
        m::debugger::SetBreakpointResponse resp;
        resp.id = id;
        resp.breakpointId = folly::to<std::string>(info.id);

        if (info.resolved) {
          resp.actualLocation =
              m::debugger::makeLocation(info.resolvedLocation);
        }

        sendResponseToClient(resp);
      })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

void Connection::Impl::handle(
    const m::debugger::SetBreakpointByUrlRequest &req) {
  debugger::SourceLocation loc;

  {
    std::lock_guard<std::mutex> lock(parsedScriptsMutex_);
    setHermesLocation(loc, req, parsedScripts_);
  }

  inspector_->setBreakpoint(loc, req.condition)
      .via(executor_.get())
      .thenValue([this, id = req.id](debugger::BreakpointInfo info) {
        m::debugger::SetBreakpointByUrlResponse resp;
        resp.id = id;
        resp.breakpointId = folly::to<std::string>(info.id);

        if (info.resolved) {
          resp.locations.emplace_back(
              m::debugger::makeLocation(info.resolvedLocation));
        }

        sendResponseToClient(resp);
      })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

void Connection::Impl::handle(
    const m::debugger::SetPauseOnExceptionsRequest &req) {
  debugger::PauseOnThrowMode mode = debugger::PauseOnThrowMode::None;

  if (req.state == "none") {
    mode = debugger::PauseOnThrowMode::None;
  } else if (req.state == "all") {
    mode = debugger::PauseOnThrowMode::All;
  } else if (req.state == "uncaught") {
    mode = debugger::PauseOnThrowMode::Uncaught;
  } else {
    sendErrorToClientViaExecutor(
        req.id, "Unknown pause-on-exception state: " + req.state);
    return;
  }

  sendResponseToClientViaExecutor(
      inspector_->setPauseOnExceptions(mode), req.id);
}

void Connection::Impl::handle(const m::debugger::StepIntoRequest &req) {
  sendResponseToClientViaExecutor(inspector_->stepIn(), req.id);
}

void Connection::Impl::handle(const m::debugger::StepOutRequest &req) {
  sendResponseToClientViaExecutor(inspector_->stepOut(), req.id);
}

void Connection::Impl::handle(const m::debugger::StepOverRequest &req) {
  sendResponseToClientViaExecutor(inspector_->stepOver(), req.id);
}

std::vector<m::runtime::PropertyDescriptor>
Connection::Impl::makePropsFromScope(
    std::pair<uint32_t, uint32_t> frameAndScopeIndex,
    const std::string &objectGroup,
    const debugger::ProgramState &state) {
  // Chrome represents variables in a scope as properties on a dummy object.
  // We don't instantiate such dummy objects, we just pretended to have one.
  // Chrome has now asked for its properties, so it's time to synthesize
  // descriptions of the properties that the dummy object would have had.
  std::vector<m::runtime::PropertyDescriptor> result;

  uint32_t frameIndex = frameAndScopeIndex.first;
  uint32_t scopeIndex = frameAndScopeIndex.second;
  debugger::LexicalInfo lexicalInfo = state.getLexicalInfo(frameIndex);
  uint32_t varCount = lexicalInfo.getVariablesCountInScope(scopeIndex);

  // If this is the frame's local scope, include 'this'.
  if (scopeIndex == 0) {
    auto varInfo = state.getVariableInfoForThis(frameIndex);
    m::runtime::PropertyDescriptor desc;
    desc.name = varInfo.name;
    desc.value = m::runtime::makeRemoteObject(
        getRuntime(), varInfo.value, objTable_, objectGroup);
    // Chrome only shows enumerable properties.
    desc.enumerable = true;
    result.emplace_back(std::move(desc));
  }

  // Then add each of the variables in this lexical scope.
  for (uint32_t varIndex = 0; varIndex < varCount; varIndex++) {
    debugger::VariableInfo varInfo =
        state.getVariableInfo(frameIndex, scopeIndex, varIndex);

    m::runtime::PropertyDescriptor desc;
    desc.name = varInfo.name;
    desc.value = m::runtime::makeRemoteObject(
        getRuntime(), varInfo.value, objTable_, objectGroup);
    desc.enumerable = true;

    result.emplace_back(std::move(desc));
  }

  return result;
}

std::vector<m::runtime::PropertyDescriptor>
Connection::Impl::makePropsFromValue(
    const jsi::Value &value,
    const std::string &objectGroup,
    bool onlyOwnProperties) {
  std::vector<m::runtime::PropertyDescriptor> result;

  if (value.isObject()) {
    jsi::Runtime &runtime = getRuntime();
    jsi::Object obj = value.getObject(runtime);

    // TODO(hypuk): obj.getPropertyNames only returns enumerable properties.
    jsi::Array propNames = onlyOwnProperties
        ? runtime.global()
              .getPropertyAsObject(runtime, "Object")
              .getPropertyAsFunction(runtime, "getOwnPropertyNames")
              .call(runtime, obj)
              .getObject(runtime)
              .getArray(runtime)
        : obj.getPropertyNames(runtime);

    size_t propCount = propNames.length(runtime);
    for (size_t i = 0; i < propCount; i++) {
      jsi::String propName =
          propNames.getValueAtIndex(runtime, i).getString(runtime);

      m::runtime::PropertyDescriptor desc;
      desc.name = propName.utf8(runtime);

      try {
        // Currently, we fetch the property even if it runs code.
        // Chrome instead detects getters and makes you click to invoke.
        jsi::Value propValue = obj.getProperty(runtime, propName);
        desc.value = m::runtime::makeRemoteObject(
            runtime, propValue, objTable_, objectGroup);
      } catch (const jsi::JSError &err) {
        // We fetched a property with a getter that threw. Show a placeholder.
        // We could have added additional info, but the UI quickly gets messy.
        desc.value = m::runtime::makeRemoteObject(
            runtime,
            jsi::String::createFromUtf8(runtime, "(Exception)"),
            objTable_,
            objectGroup);
      }

      result.emplace_back(std::move(desc));
    }

    if (onlyOwnProperties) {
      jsi::Value proto = runtime.global()
                             .getPropertyAsObject(runtime, "Object")
                             .getPropertyAsFunction(runtime, "getPrototypeOf")
                             .call(runtime, obj);
      if (!proto.isNull()) {
        m::runtime::PropertyDescriptor desc;
        desc.name = "__proto__";
        desc.value = m::runtime::makeRemoteObject(
            runtime, proto, objTable_, objectGroup);
        result.emplace_back(std::move(desc));
      }
    }
  }

  return result;
}

void Connection::Impl::handle(const m::runtime::GetPropertiesRequest &req) {
  auto resp = std::make_shared<m::runtime::GetPropertiesResponse>();
  resp->id = req.id;

  inspector_
      ->executeIfEnabled(
          "Runtime.getProperties",
          [this, req, resp](const debugger::ProgramState &state) {
            std::string objGroup = objTable_.getObjectGroup(req.objectId);
            auto scopePtr = objTable_.getScope(req.objectId);
            auto valuePtr = objTable_.getValue(req.objectId);

            if (scopePtr != nullptr) {
              resp->result = makePropsFromScope(*scopePtr, objGroup, state);
            } else if (valuePtr != nullptr) {
              resp->result = makePropsFromValue(
                  *valuePtr, objGroup, req.ownProperties.value_or(true));
            }
          })
      .via(executor_.get())
      .thenValue([this, resp](auto &&) { sendResponseToClient(*resp); })
      .thenError<std::exception>(sendErrorToClient(req.id));
}

/*
 * Send-to-client methods
 */

void Connection::Impl::sendToClient(const std::string &str) {
  if (remoteConn_) {
    remoteConn_->onMessage(str);
  }
}

void Connection::Impl::sendResponseToClient(const m::Response &resp) {
  sendToClient(resp.toJson());
}

void Connection::Impl::sendNotificationToClient(const m::Notification &note) {
  sendToClient(note.toJson());
}

folly::Function<void(const std::exception &)>
Connection::Impl::sendErrorToClient(int id) {
  return [this, id](const std::exception &e) {
    sendResponseToClient(
        m::makeErrorResponse(id, m::ErrorCode::ServerError, e.what()));
  };
}

void Connection::Impl::sendResponseToClientViaExecutor(int id) {
  sendResponseToClientViaExecutor(folly::makeFuture(), id);
}

void Connection::Impl::sendResponseToClientViaExecutor(
    folly::Future<Unit> future,
    int id) {
  future.via(executor_.get())
      .thenValue([this, id](const Unit &unit) {
        sendResponseToClient(m::makeOkResponse(id));
      })
      .thenError<std::exception>(sendErrorToClient(id));
}

void Connection::Impl::sendErrorToClientViaExecutor(
    int id,
    const std::string &error) {
  folly::makeFuture()
      .via(executor_.get())
      .thenValue([this, id, error](const Unit &unit) {
        sendResponseToClient(
            makeErrorResponse(id, m::ErrorCode::ServerError, error));
      });
}

void Connection::Impl::sendNotificationToClientViaExecutor(
    const m::Notification &note) {
  executor_->add(
      [this, noteJson = note.toJson()]() { sendToClient(noteJson); });
}

/*
 * Connection
 */
Connection::Connection(
    std::unique_ptr<RuntimeAdapter> adapter,
    const std::string &title,
    bool waitForDebugger)
    : impl_(
          std::make_unique<Impl>(std::move(adapter), title, waitForDebugger)) {}

Connection::~Connection() = default;

jsi::Runtime &Connection::getRuntime() {
  return impl_->getRuntime();
}

std::string Connection::getTitle() const {
  return impl_->getTitle();
}

bool Connection::connect(std::unique_ptr<IRemoteConnection> remoteConn) {
  return impl_->connect(std::move(remoteConn));
}

bool Connection::disconnect() {
  return impl_->disconnect();
}

void Connection::sendMessage(std::string str) {
  impl_->sendMessage(std::move(str));
}

} // namespace chrome
} // namespace inspector
} // namespace hermes
} // namespace facebook
