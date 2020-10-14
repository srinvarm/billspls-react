import React, {useState, useEffect} from 'react'
import PlansPage from '../pages/PlansPage'

function AuthenticateUser(props) {
    //console.log(props.userData)
    //const [userData, setUserData] = useState(props.userData)
    

    //console.log(userLoggedIn)
    //const loggedPage = props.userData ? <PlansPage/> : <h1>User Not Authenticated</h1>
    //console.log(loggedPage)
    return (
        <div>
           <PlansPage/>
        </div>
    )
}

export default AuthenticateUser
