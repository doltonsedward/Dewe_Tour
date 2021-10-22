import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer, 0)
store.subscribe(() =>{
    console.log('Current state', store.getState())
})

store.dispatch({
    type: 'INCREMENT'
})
store.dispatch({
    type: 'INCREMENT'
})

export default store