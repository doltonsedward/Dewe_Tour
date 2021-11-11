
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Logo } from '../assets'
import { Header, Footer, Modal } from '../components'
import { Home, DetailTrip, Payment, Profile, ListTransaction, Trip, AddTrip, NotFound, Search } from './'
import { API, PrivateRoute, setAuthToken } from '../config'
import store from '../store'
import { useEffect } from 'react'
import { Dashboard, Maintenance, UpdateTrip, Application } from './Admin'
import { useSelector } from 'react-redux'
import AddCountry from './Admin/AddCountry/AddCountry'
import QrCodeGenerator from './Admin/Application/QrCodeGenerator'
import Chat from './Chat'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    const currentState = useSelector(state => state)
    console.log(currentState)
    
    useEffect(()=> {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
    }, [currentState])

    const checkUser = async () => {
        try {
            const response = await API.get('/check-auth')

            if (response.status === 404) {
                return store.dispatch({
                    type: "AUTH_ERROR",
                });
            }
            
            let payload = response.data.data.user
            
            payload.token = localStorage.token;

            store.dispatch({
                type: "USER_SUCCESS",
                payload,
              });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        checkUser()
    }, [])
    
    return (
        <>
        <Router>
            <Header logo={Logo} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Redirect path="/detail-trip/" to="/not-found" exact />
                    <Route path="/detail-trip/:id">
                        <DetailTrip />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/payment">
                        <Payment />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/message">
                        <Chat />
                    </Route>

                    <PrivateRoute path="/admin/dashboard/application/qr-code-generator" component={QrCodeGenerator} />
                    <PrivateRoute path="/admin/dashboard/maintenance" component={Maintenance} />
                    <PrivateRoute path="/admin/dashboard/application" component={Application} />
                    <PrivateRoute path="/admin/dashboard" component={Dashboard} />
                    <PrivateRoute path="/list-transaction" component={ListTransaction} />
                    <PrivateRoute path="/trip" component={Trip} />
                    <PrivateRoute path="/add-country" component={AddCountry} />
                    <PrivateRoute path="/add-trip" component={AddTrip} />
                    <PrivateRoute path="/update-trip/:id" component={UpdateTrip} />
                    
                    {/* if route is not exist, send default route */}
                    <Route>
                        <Redirect to="/not-found" />
                        <NotFound />
                    </Route>
                </Switch>
            <Footer />
        </Router>
        </>
    )
}

export default App