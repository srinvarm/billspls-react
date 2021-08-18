import React from 'react';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import Confirmpage from './pages/ConfirmPage';
import Login from './pages/login'
import Planspage from './pages/PlansPage'
import AccountingSoftware from './pages/AccountingSoftware/AccountingSoftware'
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthRoutes = props => {
  return (
    <Router basename={'/payment'}>
    
    <Switch>
    <Route exact path="/" component={Planspage} />
    <Redirect to={"/"} />
    </Switch>
    </Router>
  )
}
const HomeRoutes = props => {
  return (
    <Router basename={'/payment'}>
    <Switch>
    <Route exact path="/" component={Planspage} />
    <Route exact path="/proceed" component={Confirmpage} />
    <Route exact path="/integration" component={AccountingSoftware} />
    <Route exact path='/getToken' component={AccountingSoftware} />
    <Redirect to={"/"} />
    </Switch>
    </Router>
  )
}

const CustomerRoutes = props => {
  console.log(props.isLoggin)
  if (props.isLoggin)
    return <HomeRoutes />
  else return <AuthRoutes />
}
function App() {
  // const { token,isLoggedIn } = useSelector(user => user);
  const {token,isLoggedIn} = useSelector(({user})=>user)

  console.log(token)
  console.log(isLoggedIn)
  const isLoggin = isLoggedIn && token;
  console.log(!!isLoggedIn)
  return (
    <div className="App">
      <Router basename={'/payment'}>
      <ToastContainer />
      {
        !!isLoggin ?
         <CustomerRoutes isLoggin={!!isLoggin} />  :

        <CustomerRoutes isLoggin={!!isLoggin} /> 
      }
      </Router>
    </div>
  );
}

export default App;



