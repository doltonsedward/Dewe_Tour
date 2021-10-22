const rootReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify({
                isLogin: true,
                user: payload
            }))

            return {
                isLogin: true,
                user: payload
            }
            
        case 'LOGOUT':
            localStorage.setItem('user', JSON.stringify({
                isLogin: false,
                user: payload
            }))
            return {
                ...state,
                isLogin: false
            }

        default:
            return state
    }
}

export default rootReducer;