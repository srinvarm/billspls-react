import React,{useEffect} from "react";
import {IND_ONE_BASE_URL,PATH} from './Constants'
import axios from 'axios'
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import _store from "./store/store"
import './App.css';
import RootRouter from "./Rootrouter";
// import Test from './components/BottomModal'
import Login from './pages/login'

const {persistor, store} = _store();


// require('dotenv').config()

const App=(props)=> {

  console.log(!process.env.NODE_ENV)
  const Gettingtoken=()=> {
    const data = {
      email:"jyothi.prakash@in-d.ai",
      password:"kalavathi"
    };
    try {
      const uidinsert = axios
        .post(`${IND_ONE_BASE_URL}${PATH.users}`, data, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.access)
        });
    } catch (error) {
      console.log("error", error);
    }
}

  return (
    <div>
    <button onClick={Gettingtoken}>Token</button>

    {/*
     <button onClick={Gettingtoken}>Token</button>

    <Test />
    */}
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RootRouter  />
      </Provider>
    </PersistGate>
    </div>
  );
}


export default App