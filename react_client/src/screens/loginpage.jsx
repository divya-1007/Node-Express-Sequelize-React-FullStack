import axios from 'axios'
import React, { useState } from 'react';
import '../assert/login.css'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


function Loginpage() {
const[username ,setUserName] = useState('')
const[password ,setPassword] = useState('')
const[usernameCheck ,setUsernameCheck] = useState(false);
const[passwordCheck ,setPasswordCheck] = useState(false)



function checkData() {
    setUserName('')
    setUsernameCheck('')
    setPassword('')
    setPasswordCheck('')
}

let checkValidation = ()=>{
     let valid = true;
    if(username ==='' || username === null || username === undefined){
        setUsernameCheck(true);
        valid = false;
    }else{
        setUsernameCheck(false);
    }
   
    if(password === '' || password === null || password === undefined){
        setPasswordCheck(true);
        valid = false;
    }else{
        setPasswordCheck(false)
    }
    return valid ;
}

const handelSignIn = async(e)=>{
    e.preventDefault()
    const valid = checkValidation();
    console.log("☢️ ~ file: index.js ~ line 44 ~ handleSubmit ~ valid", valid)
    if (!valid) {
        return false;
    }
    const formData = {username,password}

    const response =  await axios.post('/api/products/login', formData)
          console.log(response.data);
    if(response.data.status=== 1){
    swal("Success","SuccessFully", "success", {
        buttons: false,
        timer: 2000,
        }).then((value) => {
            console.log(response.data ,"data");
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.user.role=== 1){
                window.location.href = "/dashboard";
            }
            else{
                window.location.href = "/";
            }
            checkData()
            });
        }else if(response.data.status=== 0){
        swal("Oops!", response.data.message, "error", {
            buttons: true,
            timer: 2000,
            })
            checkData();
        }
    }

    return (
        <>
        <section className="login">
		<div className="login_box">
			<div className="lefts">
				<div className="top_link">You Are not Login please
                <br />
                <Link to='/signup'>
                    <img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt=""/>
                    Return Logup </Link>
                </div>
				<div className="contact ml-3">
					<form onSubmit={handelSignIn}>
						<h3>LOG IN</h3>
						<input type="text" required='' placeholder="USERNAME"  value={username}
                            onChange={(e) => setUserName(e.target.value)}/>
                            <div>
                            {usernameCheck === true ? (
                            username === "" ||
                            username === null ||
                            username === undefined ? (
                                <span className="text-danger err-msg">
                                Please Enter  userName
                                </span>
                            ) : null
                            ) : null}
                            </div>
						<input type="password" required='' placeholder="PASSWORD"  value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                            <div>
                             {passwordCheck === true ? (
                                password === "" ||
                                password === null ||
                                password === undefined ? (
                                    <span className="text-danger err-msg">
                                    Please Enter password
                                    </span>
                                ) : null
                             ) : null}
                            </div>
						<button className="submit">LET'S GO</button>
					</form>
				</div>

			</div>
			<div className="rights">
				<div className="right-text">
					<h2>ASUM</h2>
					<h5>A UX BASED CREATIVE AGENCEY</h5>
				</div>
				<div className="right-inductor">
                <img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt=""/></div>
			</div>
		</div>
	    </section>
        </>
    )
}

export default Loginpage
