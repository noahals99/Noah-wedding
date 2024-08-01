import { color, delay, motion } from 'framer-motion';
import axios from 'axios';
import { apiUrlStart } from '../routes/Root';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../routes/Root';

const pageVariants = {
    open: {
        opacity: 1,
        transition:{
            duration:0.2
        }
    },
    closed: {
        opacity: 0,
        transition:{
            duration:.8,
            delay: 0.5
        }
    }
}


const cardVariants = {
    open: {
        opacity: 1,
        transition:{
            duration:0.4,
            delay: 0.2
        }
    },
    closed: {
        opacity: 0,
        transition:{
            duration:1,
            delay: 0.3
        }
    }
}

const textVariants = {
    open: {
        opacity: 1,
        transition:{
            duration:1,
            delay: 0.6
        }
    },
    closed: {
        opacity: 0,
        transition:{
            duration:0.5,
        }
    }
}

const transition = {
    selected: {
        opacity: 0,
        transition: {
            duration: 0.8,
            delay: 1.2
        }
    },
    notSelected: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

function UserSelectPopup({isRsvpClick, setWhileHoverToggle, setInputBlockingboxStatus, setVariantHolder, setSelectedItem, isUserSelectPopupVisible, setIsUserSelectPopupVisible}){
    const [userList, setUserList] = useState(null);
    const {setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    const [popupStyle, setpopupStyle] = useState({"display": "none"});


    useEffect(() => {
        let apiUrl = `${apiUrlStart}/getAllUsers`;
        axios({
            method: "GET",
            url: apiUrl,
            headers: { 
              'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`, 
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((response) => {
                setUserList(response.data)
            })
            .catch((error) => {
              console.log(error);
            })
    },[])

    useEffect(() => {
        if(isUserSelectPopupVisible === false){
            setTimeout(() => {
                setpopupStyle({"display": "none"})
            }, 1200)
        }else{
            setpopupStyle({"display": "flex"})
        }
    },[isUserSelectPopupVisible])


    const handleClick = (user) => {
        setUserData(user)
        setIsUserSelectPopupVisible(false);
        if(isRsvpClick === true){
            
            setTimeout(() => {
                setInputBlockingboxStatus("block");
                setSelectedItem('RSVP');
                setVariantHolder(transition)

                // Navigate after a 1-second delay
                setTimeout(() => {
                    setWhileHoverToggle(0.4);
                    navigate(`/rsvp`);
                }, 2000);
            }, 1200)
        }
        
        
    }
    
    const handleBackClick = (event) => {
        if((event.target.id === "password-popup-page") || (event.target.id === "popup-exit-button")){
            setIsUserSelectPopupVisible(false);
        }
    }

    return(
        <motion.div
                    style={popupStyle}
                    id="password-popup-page"
                    initial={false}
                    animate={isUserSelectPopupVisible ? "open" : "closed"}
                    variants={pageVariants}
                    onClick={handleBackClick}
                >
                    <motion.div className='user-select-card'
                        initial={false}
                        animate={isUserSelectPopupVisible ? "open" : "closed"}
                        variants={cardVariants}
                    >
                        <motion.div
                            className='user-select-text-container'
                            initial={false}
                            animate={isUserSelectPopupVisible ? "open" : "closed"}
                            variants={textVariants}
                        >
                            <p className='user-select-title'>Who are you?</p>
                            <div className='name-list-box noselect'>
                                {(userList)&&
                                    <div className='name-list-box-container'>
                                        {Object.keys(userList).map((user) => {
                                            if(userList[user].firstName !== "Admin"){
                                                if((user < userList.length-1) && (user > 1)){
                                                    return(
                                                        <motion.div
                                                            className='user-box middle-box'
                                                            key={`user-select${userList[user]._id}`}
                                                            whileTap={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
                                                            onClick={() => handleClick(userList[user])}
                                                        >
                                                            <p>{userList[user].firstName} {userList[user].lastName}</p>
                                                        </motion.div>
                                                    )
                                                }else if(user == 1){
                                                    return(
                                                        <motion.div
                                                            className='user-box middle-box top-box'
                                                            key={`user-select${userList[user]._id}`}
                                                            whileTap={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
                                                            onClick={() => handleClick(userList[user])}
                                                        >
                                                            <p>{userList[user].firstName} {userList[user].lastName}</p>
                                                        </motion.div>
                                                    )
                                                }else{
                                                    return(
                                                        <motion.div
                                                            className='user-box bottom-box'
                                                            key={`user-select${userList[user]._id}`}
                                                            whileTap={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
                                                            onClick={() => handleClick(userList[user])}
                                                        >
                                                            <p>{userList[user].firstName} {userList[user].lastName}</p>
                                                        </motion.div>
                                                    )
                                                }
                                                
                                            }else{
                                                return(
                                                    <div key={`user-select${userList[user]._id}`}>
                                                    </div>
                                                )
                                            }
                                            
                                        })}
                                    </div>
                                }
                            </div>
                        </motion.div>
                        <p id='popup-exit-button' className='noselect' onClick={handleBackClick}>X</p>
                    </motion.div>
                
                </motion.div> 
    )
}


export default UserSelectPopup