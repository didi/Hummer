export  function createLoggerPlugin(){
  return (store) => {

    store.subscribe((mutation, state) => {
      console.log('Mutation')
      console.log(Object.keys(state))
      console.log(Object.keys(state).length)
    })

    // if (logActions) {
    //   store.subscribeAction((action, state) => {
    //     if (actionFilter(action, state)) {
    //       const formattedTime = getFormattedTime()
    //       const formattedAction = actionTransformer(action)
    //       const message = `action ${action.type}${formattedTime}`

    //       startMessage(logger, message, collapsed)
    //       logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction)
    //       endMessage(logger)
    //     }
    //   })
    // }
  }
}