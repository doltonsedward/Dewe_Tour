import { Redirect, Route } from "react-router"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const getAccess = user.user.role === 'admin' ? true : false
    return (
        <>
            {/* need watched */}
            <Route {...rest} render={(props) => (getAccess ? <Component {...props} /> : <Redirect to="/" />)} />
            {/* props have history, location, match, staticContext */}
        </>
    )
}

export { PrivateRoute }
