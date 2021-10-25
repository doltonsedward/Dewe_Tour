
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Logo } from '../assets'
import { Header, Footer, Modal } from '../components'
import { Home, DetailTrip, Payment, Profile, ListTransaction, Trip, AddTrip } from './'
import { PrivateRoute } from '../config'

const App = () => {
    return (
        <>
        <Router>
            <Header logo={Logo} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                        <Modal variant="modal-login" />
                        <Modal variant="modal-register" />
                    </Route>
                    <Route path="/detail-trip/:id">
                        <DetailTrip />
                        <Modal variant="modal-login" />
                        <Modal variant="modal-register" />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                        <Modal variant="modal-login" />
                        <Modal variant="modal-register" />
                    </Route>
                    <Route path="/payment">
                        <Payment />
                        <Modal variant="modal-login" />
                        <Modal variant="modal-register" />
                    </Route>
                    <PrivateRoute path="/list-transaction" component={ListTransaction} />
                    <PrivateRoute path="/trip" component={Trip} />
                    <PrivateRoute path="/add-trip" component={AddTrip} />
                </Switch>
            <Footer />
        </Router>
        </>
    )
}

export default App