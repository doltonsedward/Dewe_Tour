import { createStore } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer, false)
store.subscribe(() =>{
    console.log('Current state', store.getState())
})

export default store
