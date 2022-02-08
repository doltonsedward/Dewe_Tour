import "../../assets/scss/loading.scss";

import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Logo } from "../../assets";
import { Header, Footer } from "../../components";
import { PrivateRoute } from "../../config";
import {
  Home,
  DetailTrip,
  Chat,
  Dashboard,
  Payment,
  Profile,
  ListTransaction,
  Trip,
  AddTrip,
  NotFound,
  Search,
  ChatAdmin,
  AddCountry,
  UpdateTrip,
} from "../../pages";

const Routes = () => {
  const currentState = useSelector((state) => state);

  return (
    <Router>
      <Header logo={Logo} />
      <Switch>
        <Route exact path="/">
          {currentState.isLoading && (
            <div className="loading-section">
              <div className="loading">
                <p>loading</p>
                <span></span>
              </div>
            </div>
          )}
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

        <PrivateRoute path="/admin/dashboard" component={Dashboard} />
        <PrivateRoute path="/admin/message" component={ChatAdmin} />
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
  );
};

export default Routes;
