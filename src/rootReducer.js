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
            localStorage.removeItem('user')
            return {
                ...state,
                isLogin: false
            }

        default:
            return state
    }
}

export default rootReducer;