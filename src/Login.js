import { useState, useEffect } from 'react';
import './App.css';
import Details from './Components/DetailComponent';
function LoginComponent(props) {
   const [requestedEmail, setRequestedEmail] = useState("");
   const [requestedPassword, setRequestedPassword] = useState("");
   const [error, setError] = useState("");
   const [isFound, setFound] = useState(false);
   const [isLoggedIn, setLoggedIn] = useState(false);
   const submit = () => {
      let foundFlag = false;
      props.userList.forEach((items) => {
         if ((items.userData.userData.Email === requestedEmail) && (items.userData.userData.Password === requestedPassword)) {
            items.userData.userData.isSelected = true;
            props.loginAccount(items);
            foundFlag = true;
         }
      })
      setFound(foundFlag);
      if (isFound) {
         setError("Please input valid user Id and Password");
      }
      setRequestedEmail("");
      setRequestedPassword("");

   }
   useEffect(() => {
      let flag = false;
      props.userList.forEach((items) => {
         if (items.userData.userData.isSelected === true) {
            flag = true;
            setError("");
         }
      });
      setLoggedIn(flag);

   });
   return (
      isLoggedIn === true ? <Details /> :
         <div className="row">
            <div className="col">
               <div className="mb-3">
                  <h1>Login Page</h1>
               </div>
               <form className="form">
                  <div className="input-group mb-3">
                     <span className="input-group-text">Email</span>
                     <input className="form-control" onChange={(e) => setRequestedEmail(e.target.value)} autoFocus value={requestedEmail} type="email" placeholder="Enter valid Email" required></input>
                     <span className="input-group-text" id="basic-addon2">@example.com</span>
                  </div>
                  <div className="input-group mb-3">
                     <span className="input-group-text">Password</span>
                     <input type="password" className="form-control" onChange={(e) => { setRequestedPassword(e.target.value) }} placeholder="Enter valid password" value={requestedPassword} required></input>
                  </div>
                  <div>
                     <span className="error-text">{error}</span>
                  </div>
                  <div className="input-group d-grid mb-3 ">
                     <button className="btn btn-primary" onClick={submit} type="button">Login</button>
                  </div>
               </form>
            </div>
         </div>
   )
}

export default LoginComponent;