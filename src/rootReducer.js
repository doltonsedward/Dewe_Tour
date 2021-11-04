const initialValue = JSON.parse(localStorage.getItem('user'))

const rootReducer = (state = initialValue, action) => {
    const {type, payload} = action
    
    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN':
            localStorage.setItem('token', payload.token)
            localStorage.setItem('user', JSON.stringify({
                isLogin: true,
                user: payload
            }))

            return {
                isLogin: true,
                user: payload
            }
            
        case 'LOGOUT':
            localStorage.removeItem('token', payload.token)
            localStorage.setItem('user', JSON.stringify({
                isLogin: false,
                user: {}
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