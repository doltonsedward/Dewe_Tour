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
                isLogin: false,
                user: payload
            }

        case 'REGISTER':
            return {
                isLogin: false,
                user: payload
            }
        default:
            return state
    }
}

export default rootReducer;