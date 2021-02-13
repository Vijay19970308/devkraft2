import { useState, useEffect } from 'react';
import SignUp from './Components/SignUpComponent';
import Login from './Components/LoginComponent';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
function Main(props) {
  const [toggleVisibility, setToggleVisibility] = useState(true);
  const [color, changeColor] = useState("#00FFFF");
  const [color1, changeColor1] = useState("#e50914");

  useEffect(() => {
    let flag = false;
    props.userList.forEach((items) => {
      if (items.userData.userData.isSelected === true)
        flag = true;
    })
    setToggleVisibility(flag);
  })
  
  return (
    <BrowserRouter>
      {toggleVisibility === false ?
        <div className="row mb-1 p-1">
          <div className="col p-3">
            <nav className="nav" >
              <div className="list">
                <Link style={{ background: color }} className="link p-3" onClick={() => { changeColor("#e50914"); changeColor1("#00FFFF") }} to="/Create" >Create a account</Link>
                <Link style={{ background: color1 }} className="link p-3" onClick={() => { changeColor1("#e50914"); changeColor("#00FFFF") }} to="/" >Login</Link>
              </div>
            </nav>
          </div>
        </div> : ""}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Create" component={SignUp} />
        <Route path="/*" component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Main;