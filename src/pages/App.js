
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Logo } from '../assets'
import { Header, Footer, Modal } from '../components'
import { Home, DetailTrip, Payment } from './'

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
                    <Route path="/payment">
                        <Payment />
                        <Modal variant="modal-login" />
                        <Modal variant="modal-register" />
                    </Route>
                </Switch>
            <Footer />
        </Router>
        </>
    )
}

export default App