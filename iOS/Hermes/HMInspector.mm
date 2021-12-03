#import "HMInspector.h"
#import "HMInspectorPackagerConnection.h"
#include <jsinspector/InspectorInterfaces.h>

namespace {
class RemoteConnection : public facebook::react::IRemoteConnection {
public:
    RemoteConnection(HMInspectorRemoteConnection *connection) : connection(connection) {}
    
    virtual void onMessage(std::string message) override {
        [connection onMessage:@(message.c_str())];
    }
    
    virtual void onDisconnect() override {
        [connection onDisconnect];
    }
    
private:
    const HMInspectorRemoteConnection *connection;
};
}

@implementation HMInspectorPage

- (instancetype)init {
    NSAssert(NO, @"HMInspectorPage unavailable");
    
    return [self initWithId:0 title:nil vm:nil];
}

- (instancetype)initWithId:(NSInteger)id title:(nullable NSString *)title vm:(nullable NSString *)vm {
    self = [super init];
    _id = id;
    _title = title.copy;
    _vm = vm.copy;
    
    return self;
}

@end

NS_ASSUME_NONNULL_BEGIN

@interface HMInspectorLocalConnection () {
    std::unique_ptr<facebook::react::ILocalConnection> _connection;
}

- (instancetype)initWithConnection:(std::unique_ptr<facebook::react::ILocalConnection>)connection NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END

static facebook::react::IInspector *getInstance() {
    return &facebook::react::getInspectorInstance();
}

@implementation HMInspector

+ (NSArray<HMInspectorPage *> *)pages {
    std::vector<facebook::react::InspectorPage> pages = getInstance()->getPages();
    NSMutableArray<HMInspectorPage *> *array = [NSMutableArray arrayWithCapacity:pages.size()];
    for (size_t i = 0; i < pages.size(); i++) {
        HMInspectorPage *pageWrapper = [[HMInspectorPage alloc] initWithId:pages[i].id
                                                                     title:@(pages[i].title.c_str())
                                                                        vm:@(pages[i].vm.c_str())];
        [array addObject:pageWrapper];
    }
    
    return array;
}

+ (HMInspectorLocalConnection *)connectPage:(NSInteger)pageId
                        forRemoteConnection:(HMInspectorRemoteConnection *)remote {
    if (!remote) {
        return nil;
    }
    RemoteConnection *remoteConnection = new (std::nothrow) RemoteConnection(remote);
    if (!remoteConnection) {
        return nil;
    }
    auto localConnection = getInstance()->connect((int)pageId, std::unique_ptr<RemoteConnection>(remoteConnection));
    
    return [[HMInspectorLocalConnection alloc] initWithConnection:std::move(localConnection)];
}

@end

@implementation HMInspectorLocalConnection

- (instancetype)initWithConnection:(std::unique_ptr<facebook::react::ILocalConnection>)connection {
    self = [super init];
    _connection = std::move(connection);
    
    return self;
}

- (void)sendMessage:(NSString *)message {
    @synchronized (self) {
        if (_connection) {
            _connection->sendMessage([message UTF8String]);
        }
    }
}

- (void)disconnect {
    @synchronized (self) {
        if (_connection) {
            _connection->disconnect();
        }
    }
}

@end
