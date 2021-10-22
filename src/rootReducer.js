const rootReducer = (state, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            isLogin: true
        }
    } else if (action.type === 'NOT_LOGIN') {
        return {
            ...state,
            isLogin: false
        }
    }
    return state
}

export default rootReducer;