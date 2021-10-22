import { createStore } from 'redux'
import rootReducer from './rootReducer'

// const initialValue = JSON.parse(localStorage.getItem('user'))
const initialValue = {
    isLogin: false,
    user: {
        email: "",
        password: ""
    }
}

const store = createStore(rootReducer, initialValue)
store.subscribe(() =>{
    console.log('Current state', store.getState())
})

export default store
