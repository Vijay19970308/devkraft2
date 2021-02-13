import { useEffect, useState } from "react";

function Details(props) {
  const [myData, setMyData] = useState({});
  const [image, setImage] = useState('');
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState([]);
  const [requestedCurrentPassword, setRequestedCurrentPassword] = useState("");
  const [requestedNewPassword, setRequestedNewPassword] = useState("");
  const [requestedConfirmNewPassword, setRequestedConfirmNewPassword] = useState("");
  useEffect(() => {
    props.userList.forEach((items) => {
      if (items.userData.userData.isSelected === true) {
        setMyData(items.userData.userData);
      }
    })
  }, [])
  const check = () => {
    let arr = [];
    setError(arr);
    console.log(requestedNewPassword);
    console.log(requestedCurrentPassword);
    if (requestedCurrentPassword !== myData.Password) {
      let arr = ["Invalid Current Password"];
      setError(arr);
    }
    else if (requestedNewPassword === requestedCurrentPassword) {
      let arr = ["", "It is an Old Password"];
      setError(arr);
    }
    else if (requestedNewPassword.length < 8) {
      let arr = ["", "Password should contain 8 characters"];
      setError(arr);
    }
    else if (requestedNewPassword.match(/[0-9]/g) === null) {
      let arr = ["", "Password should contain atleast one number from 0-9"];
      setError(arr);
    }
    else if (requestedNewPassword.match(/[a-z||A-Z]/g) === null) {
      let arr = ["", "Password should contain atleast one albhabet"];
      setError(arr);
    }
    else if (requestedNewPassword !== requestedConfirmNewPassword) {
      let arr = ["", "", "Password should be match"];
      setError(arr);
    }
    else {
      setUpdate(true);
      let myObject = Object.assign(myData);
      myObject.Password = requestedNewPassword;
      props.update(myObject);
      setRequestedCurrentPassword("");
      setRequestedNewPassword("");
      setRequestedConfirmNewPassword("");

    }
  }
  useEffect(() => {
    let pic = myData.Profile
    if (pic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      }
      reader.readAsDataURL(pic);
    }
  }, [myData]);
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt="mypic"></img>
      <div className="card-body">
        <h5 className="card-title">Details</h5>
        <p className="card-text">Email:{myData.Email}</p>
        <p className="card-text">Address:{myData.Address}</p>
        <p className="card-text">Gender:{myData.Gender}</p>
        <p className="card-text">Date of Birth:{myData.DateOfBirth}</p>
        <p className="card-text">Phone:{myData.Phone}</p>
        {update === false ?
          <div>
            <button className="btn btn-primary" onClick={() => { setUpdate(true) }}>Update password</button>
          </div>
          : <div className="card-text">
            <div className="input-group mb-2">
              <span className="input-group-text">Current Password</span>
              <input type="password" className="form-control" onChange={(e) => { setRequestedCurrentPassword(e.target.value) }} value={requestedCurrentPassword} autoFocus placeholder="Enter valid password"></input>
            </div>
            <span className="error-text">{error[0]}</span>
            <div className="input-group mb-2">
              <span className="input-group-text">New Password</span>
              <input type="password" className="form-control" onChange={(e) => { setRequestedNewPassword(e.target.value) }} value={requestedNewPassword} placeholder="Re-Enter password" required></input>
            </div>
            <span className="error-text">{error[1]}</span>
            <div className="input-group mb-2">
              <span className="input-group-text">Confirm New Password</span>
              <input type="password" className="form-control" onChange={(e) => { setRequestedConfirmNewPassword(e.target.value) }} value={requestedConfirmNewPassword} placeholder="Re-Enter password" required></input>
            </div>
            <span className="error-text">{error[2]}</span>
            <div >
              <button className="btn btn-primary" onClick={check}>Update password</button>
            </div>
          </div>}
        <div className="m-3">
          <button className="btn btn-primary" onClick={() => props.logout()}>LogOut</button>
        </div>
      </div>
    </div>
  )
}
export default Details;