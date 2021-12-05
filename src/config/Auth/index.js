import { API } from '..';
import store from '../../store'

const checkUser = async () => {
    try {
        const response = await API.get('/check-auth')

        if (response.status !== 200) {
            console.log('auth error, nomor 9')
            return store.dispatch({
                type: "AUTH_ERROR",
            });
        }
        
        let payload = response.data.data.user
        
        payload.token = localStorage.token

        store.dispatch({
            type: "USER_SUCCESS",
            payload
        })
    } catch (error) {
        console.log('stop loading, nomor 24')
        store.dispatch({
            type: "STOP_LOADING",
        })
    }
}

export { checkUser }
