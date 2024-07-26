import { UserContext } from "../routes/Root";
import { useContext, useState } from "react";
import { motion } from 'framer-motion';
import { apiUrlStart } from "../routes/Root";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PasswordPopup(){
    const {userData, setUserKey} = useContext(UserContext)
    const [password, setPassword] = useState("");
    const [isNewPassword, setIsNewpassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordTextChange = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordTextChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const toggleIsNewPass = () => {
        if(isNewPassword == true){
            setIsNewpassword(false);
        }else{
            setIsNewpassword(true);
        }
    }

    const posthandle = () => {
        const apiUrl = `${apiUrlStart}/setAdminPass`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                'password': password 
            }
        })
        .then((response) => {
            setPassword('');
            setConfirmPassword("")
            toggleIsNewPass();
        })
        .catch((error) => {
            console.log(error)
        })
    }


    const loginHandle = () => {
        const apiUrl = `${apiUrlStart}/adminLogin`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                'password': password 
            }
        })
        .then((response) => {
            console.log(response.data)
            if(response.data === "ALLOW"){
                navigate(`/admin-setup`);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }



    return(
        <div>
            {userData &&
                <motion.div
                    id="password-popup-page"
                    initial={{scale:0}}
                    animate={{scale:1,
                            transition:{
                                duration:0.2
                            }
                    }}
                >


                    
                    {(!(userData.password) && isNewPassword === false) ? 
                        <div className="password-popup-container">
                            <p className="input-title">CREATE PASSWORD</p>
                            <div className="input-container">
                                <p>Password</p>
                                <input type="password" className="input-box" value={password} onChange={handlePasswordTextChange}></input>
                                <p>Confirm Password</p>
                                <input type="password" className="input-box" value={confirmPassword} onChange={handleConfirmPasswordTextChange}></input>
                            </div>
                            {(confirmPassword === password && password.length > 0) ?
                                <div>
                                    <button onClick={posthandle}  className="submit-button">SUBMIT</button>
                                </div>:
                                <div>
                                    <button className="submit-button-grey">SUBMIT</button>
                                    
                                </div>
                                
                            }
                            {(confirmPassword !== password && password.length > 0) &&
                                <div className="error-box">
                                    <p>Passwords do not match</p>
                                </div>
                            }
                            
                            
                        </div> :
                        <div className="password-popup-container">
                            <p>PASSWORD</p>
                            <input type="password" className="input-box" value={password} onChange={handlePasswordTextChange}></input>
                            {(password.length > 0) ?
                                <div>
                                    <button onClick={loginHandle}  className="submit-button">SUBMIT</button>
                                </div>:
                                <div>
                                    <button className="submit-button-grey">SUBMIT</button>
                                    
                                </div>
                                
                            }
                        </div>
                    }
                </motion.div> 
                
            }
        </div>
        
        
    )
}

export default PasswordPopup;