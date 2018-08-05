import AppNavigation from 'App/Navigation/AppNavigation'

export const reducer = (state, action) => {

  let newState = AppNavigation.router.getStateForAction(action, state)
  const currentRoute = newState.routes[newState.index]
  newState.currentRoute = currentRoute && currentRoute.routeName
  newState = {...newState, activeTab: newState.currentRoute}
  return newState || state
}
