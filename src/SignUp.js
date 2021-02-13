import './App.css';
import { useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

function SignUp(props) {

    const [successful, setSuccessful] = useState("");
    const [requestedSignUpEmail, setRequestedSignUpEmail] = useState("");
    const [requestedSignUpPassword, setRequestedSignUpPassword] = useState("");
    const [requestedSignUpConfirmPassword, setRequestedSignUpConfirmPassword] = useState("");
    const [requestedGender, setRequestedGender] = useState("");
    const [requestedPhone, setRequestedPhone] = useState("");
    const [requestedPic, setRequestedPic] = useState("");
    const [requestedPicSize, setRequestedPicSize] = useState('');
    const [requestedDOB, setRequestedDOB] = useState("");
    const [requestedAddress, setRequestedAddress] = useState("");
    const [error, setError] = useState([]);
    const checkError = () => {
        let arr = [];
        setError(arr);
        setSuccessful("");
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(requestedSignUpEmail))) {
            let arr = ["Input a valid Email"];
            setError(arr);
        }
        else if (requestedSignUpPassword.length < 8) {
            let arr = ["", "Password should contain 8 characters"];
            setError(arr);
        }
        else if (requestedSignUpPassword.match(/[0-9]/g) === null) {
            let arr = ["", "Password should contain atleast one number from 0-9"];
            setError(arr);
        }
        else if (requestedSignUpPassword.match(/[a-z||A-Z]/g) === null) {
            let arr = ["", "Password should contain atleast one albhabet"];
            setError(arr);
        }
        else if (requestedSignUpPassword !== requestedSignUpConfirmPassword) {
            let arr = ["", "", "Password should be match"];
            setError(arr);
        }
        else if (requestedPhone.length < 10) {
            let arr = ["", "", "", "Enter a valid phone number"];
            setError(arr);

        }
        else if (requestedGender === "") {
            let arr = ["", "", "", "", "Select your gender"];
            setError(arr);
        }
        else if (requestedDOB === "") {
            let arr = ["", "", "", "", "", "Select Date of Birth"];
            setError(arr);
        }
        else if (requestedPicSize === "") {
            let arr = ["", "", "", "", "", "", "Please upload picture"];
            setError(arr);
        }
        else if ((requestedPicSize.size / 1024 / 1024) > 1) {
            let arr = ["", "", "", "", "", "", "Picture size should be less than 1MB"];
            setError(arr);
        }
        else if (requestedAddress === "") {
            let arr = ["", "", "", "", "", "", "", "Enter your address"];
            setError(arr);
        }
        else {
            if (requestedDOB !== "") {
                let backslashDOB = requestedDOB.replace(/-/g, "/");
                let myBirthday = new Date(backslashDOB);
                let currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
                let userAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
                if (userAge < 18) {
                    let arr = ["", "", "", "", "", "Age must be greater than 18"];
                    setError(arr);
                }
                else {
                    let isAlreadySignUp = false;
                    props.userList.forEach((item) => {
                        if (item.userData.userData.Email === requestedSignUpEmail)
                            isAlreadySignUp = true;

                    });
                    if (isAlreadySignUp) {
                        let arr = ["", "", "", "", "", "", "", "Email already Registered"];
                        setError(arr);
                    }
                    else {
                        props.submit(
                            {
                                Email: requestedSignUpEmail,
                                Password: requestedSignUpPassword,
                                Phone: requestedPhone,
                                Gender: requestedGender,
                                DateOfBirth: requestedDOB,
                                Profile: requestedPicSize,
                                Address: requestedAddress,
                                isSelected: false
                            });
                        setRequestedSignUpEmail("");
                        setRequestedSignUpPassword("");
                        setRequestedSignUpConfirmPassword("");
                        setRequestedPhone("");
                        setRequestedGender("");
                        setRequestedDOB("");
                        setRequestedPicSize("");
                        setRequestedPic("");
                        setRequestedAddress("");
                        setSuccessful("Add more accounts or login into your account");
                    }
                }
            }
        }
    }
    const handleChange = (e) => {
        setRequestedGender(e.target.value);
    }
    return (
        <div className="row p-3">
            <div className="col">
                <div className="mb-3">
                    <h1>SignUp Page</h1>
                </div>
                <form className="form">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Email</span>
                        <input className="form-control" autoFocus type="email" onChange={(e) => setRequestedSignUpEmail(e.target.value)} placeholder="Enter valid Email" value={requestedSignUpEmail} ></input>
                        <span className="input-group-text" id="basic-addon2">@example.com</span>
                    </div>
                    <span className="error-text">{error[0]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Password</span>
                        <input type="password" className="form-control" onChange={(e) => setRequestedSignUpPassword(e.target.value)} placeholder="Enter valid password" value={requestedSignUpPassword}></input>
                    </div>
                    <span className="error-text">{error[1]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Confirm Password</span>
                        <input type="password" className="form-control" onChange={(e) => setRequestedSignUpConfirmPassword(e.target.value)} placeholder="Re-Enter password" value={requestedSignUpConfirmPassword}></input>
                    </div>
                    <span className="error-text">{error[2]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">+91</span>
                        <input type="phone" maxLength="10" className="form-control" value={requestedPhone} onChange={(e) => setRequestedPhone(e.target.value)} placeholder="Enter a valid Phone number"></input>
                    </div>
                    <span className="error-text">{error[3]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Gender</span>
                        <div className="btn-group p-1">
                            <label className="radio-inline mx-3 ">
                                <input type="radio" value="Female" checked={requestedGender === "Female"} onChange={handleChange} name="radio-btn" />
                            Female</label>
                            <label className="radio-inline mx-3">
                                <input type="radio" checked={requestedGender === "Male"} value="Male" onChange={handleChange} name="radio-btn" />
                            Male</label>
                            <label className="radio-inline mx-3">
                                <input type="radio" checked={requestedGender === "Others"} value="Others" onChange={handleChange} name="radio-btn" />
                            Others</label>
                        </div>
                    </div>
                    <span className="error-text">{error[4]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Date of Birth</span>
                        <input type="date" onChange={(e) => setRequestedDOB(e.target.value)} value={requestedDOB} className="form-control" ></input>
                    </div>
                    <span className="error-text">{error[5]}</span>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Photo</span>
                        <input type="file" accept="image/*" onChange={(e) => { setRequestedPicSize(e.target.files[0]); setRequestedPic(e.target.value) }} value={requestedPic} className="form-control" ></input>
                    </div>
                    <span className="error-text">{error[6]}</span>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Address</span>
                        <textarea type="text" onChange={(e) => setRequestedAddress(e.target.value)} value={requestedAddress} className="form-control" ></textarea>
                    </div>
                    <span className="error-text">{error[7]}</span>
                    <div className="input-group d-grid mb-2 ">
                        <button onClick={checkError} className="btn btn-primary" type="button">SignUp</button>
                    </div>
                    <div className="success">
                        {successful}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;