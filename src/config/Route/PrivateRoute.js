import { Redirect, Route } from "react-router"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    const getAccess = user.user.email === admin.email ? true : false
    return (
        <>
            {/* need watched */}
            <Route {...rest} render={(props) => (getAccess ? <Component {...props} /> : <Redirect to="/" />)} />
            {/* props have history, location, match, staticContext */}
        </>
    )
}

export { PrivateRoute }
