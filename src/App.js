import React,{useState, useEffect} from 'react';
import AuthenticateUser from './components/AuthenticateUser';
import axios from 'axios'
import ConfirmPlan from './components/ConfirmPlan';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import ConfirmPage from './pages/ConfirmPage';


function App() {
  const [userData, setUserData] = useState({})

  const url = 'http://23.23.8.20:5030/api/users/balance'
  const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAyNDgwMjM3LCJqdGkiOiIxODM3MTE4MTM3MGQ0YTliOWNlMmFmNDBlM2Y3ZDczYiIsInVzZXJfaWQiOjQsImNoYW5uZWwiOiJHRU4iLCJpc19hZG1pbiI6dHJ1ZSwidXNlcl9lbWFpbCI6ImQuZGhha2EyMjEwQGdtYWlsLmNvbSIsInVzZXJfdHlwZSI6ImJ1c2luZXNzIiwiYWRtaW5faWQiOiI0IiwiY29tcGFueV9uYW1lIjpudWxsfQ.PTqjepjoKLSb05Z58h1SZVHCfbV-T6QWkqAR5lQYJzKLumdWuGNhL8z713rW06BTqqynSfUouuChtx9UtDf2_kmsT98UYyBBXKVkHQ91b3trz-I3pTesNuUJndEY3eJUq2pqa6ThfLuMU7YgKTqWzLbpFq1LXjRxE7_ARc_68pgV2snkUwbVxK22-U6-VTBT6tcPlUBZyWoAjiom89CgeP5xgt-YhUbJAH2US2GEOYjjP4hnJChbiKfH_8zs9N4279xOupT8AC-NVOy2Ol0R-P4LWAeLb6bIGmKnA3DaqysLOCF0OYnhFMsG2ZR3Gs0tlId0cPmwE4Wrbli0l73m8-UZd1jl-323-nIKgt5W59297t5jBLFDL91Xd1kAS-nBhs9Lfv0wQO0Fm_qhpZwHwJV0PtQPE8UEXeBZXjb_HHIz3-ASalcORh3FjSY5n63YJSxlqgd1OtDHjPjgzKKJBa_fPsLG6cWj7SbZ86LylxyjPT5yZs2eoaZLr2iJlf1LACZ8q5SxLtLtNUgQTMZytfMMARqF6-BTTEVz8ccY1Wjga4V6sAv_ySyLzbML2dSbeH6zriXWXXMMTMPn-l3Q3TILkF1ZFfjlje9DpqEL1wSOuqukc8-pU-X5WrYcn94v5XLVIkj0epjpkXyWqp_3ijB-abOKB4LdIZ1-eckuWpM"
  
  // useEffect(() => {
  //   axios.get(url,{
  //     headers: {
  //       "Authorization": `Bearer ${authToken}`,
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": true,
  //     },
  //   })
  //   .then(res => {
  //     console.log(res)
  //     setUserData(res.data)
  // })
  // .catch(err => {
  //     console.log(err)
  // })
  // },[])
  
  return (
    <div className="App">
      {/* <AuthenticateUser userData={userData} /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={AuthenticateUser} />
          <Route path="/proceed" component={ConfirmPage} />
        </Switch>
      </Router>
      {/* <AuthenticateUser userDate={{}}/> */}
    </div>
  );
}

export default App;
