import { motion, useCycle } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { languageContext, UserContext } from './Root';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PasswordPopup from '../components/PasswordPopup';
import { adminId } from './Root';
import UserSelectPopup from '../components/UserSelectPopup';


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




function Home() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [variantHolder, setVariantHolder] = useState(null)
    const [whileHoverToggle, setWhileHoverToggle] = useState(0.4)
    const [inputBlockingboxStatus, setInputBlockingboxStatus] = useState('none')
    const language = useContext(languageContext).language;
    const navigate = useNavigate();
    const {userKey, setUserKey, userData, setHasSeenHome, setIsUserKeyLoading} = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const [isPassPopupVisible, setIsPassPopupVisible] = useState(false);
    const [isRsvpClick, setIsRsvpClick] = useState(false);
    const [isUserSelectPopupVisible, setIsUserSelectPopupVisible] = useState(false);
    


    useEffect(() => {
        if(searchParams.get('id') !== null){
            if(searchParams.get('id') == "admin"){
                window.localStorage.removeItem("userId");
                setUserKey(adminId);
                setHasSeenHome(true);
            }else{
                window.localStorage.removeItem("userId");
                setUserKey(searchParams.get('id'));
            };
        }else{
            setIsUserKeyLoading(false);
        }
        
    },[])

    


    const togglePopupVisibility = () => {
        if(isPassPopupVisible === true){
            setIsPassPopupVisible(false);
        }else{
            setIsPassPopupVisible(true);
        }
    }



    const translateSpanish = (menuItem) => {
        if(menuItem === "INFORMATION"){
            return "INFORMACIÓN"
        }else if(menuItem === "VENUE"){
            return "UBICACIÓN"
        }else if(menuItem === "LODGING"){
            return "ESTADIA"
        }else if(menuItem === "RSVP"){
            return "RSVP"
        }else if(menuItem === "REGISTRY"){
            return "REGISTRO"
        }else if(menuItem === "ADMIN"){
            return "ADMIN"
        }
    }

    const isSelected = (menuItem) => {
        if(menuItem === selectedItem){
            return true
        }else{
            return false
        }
    }


    const handleSelection = (menuItem, noLogin) => {
        if(menuItem !== "ADMIN"){
            if(noLogin && menuItem === 'RSVP'){
                setIsRsvpClick(true);
                setIsUserSelectPopupVisible(true);
            }else{
                setInputBlockingboxStatus("block");
                setSelectedItem(menuItem);
                setVariantHolder(transition)
                
                
            
                // Navigate after a 1-second delay
                setTimeout(() => {
                    setWhileHoverToggle(0.4);
                    navigate(`/${menuItem.toLowerCase()}`);
                }, 2000);
            }
            
        }else{
            togglePopupVisibility();
        }
        
    };

    return (
        <div className="app-background-color">
            <motion.div
                id='home-transition-box'
                initial={{opacity:1}}
                animate={{opacity:0}}
                transition={{duration:2, delay:0.3}}
            ></motion.div>
            {userData && 
                <div>
                    {language === "ENGLISH" ? 
                        <div id='welcome-message-container'>
                            <motion.p
                                id='welcome-message-text'
                                initial={false}
                                variants={variantHolder}
                                animate={"selected"}
                            >
                                {(userData.group) ? `WELCOME ${userData.group.name.toUpperCase()}` : `WELCOME ${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`}
                                
                                
                            </motion.p>
                            <motion.p 
                                id='incorrect-user-text'
                                initial={false}
                                variants={variantHolder}
                                animate={"selected"}
                            >
                                IS THIS NOT YOU? <span id='incorrect-user-text-span' onClick={() => setIsUserSelectPopupVisible(true)}>SWITCH ACCOUNTS</span>
                            </motion.p>
                        </div> :
                        <div id='welcome-message-container'>
                        <motion.p
                            id='welcome-message-text'
                            initial={false}
                            variants={variantHolder}
                            animate={"selected"}
                        >
                            {(userData.group) ? `BIENVENIDOS ${userData.group.name.toUpperCase()}` : `BIENVENIDOS ${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`}
                            
                            
                        </motion.p>
                        <motion.p 
                                id='incorrect-user-text'
                                initial={false}
                                variants={variantHolder}
                                animate={"selected"}
                            >
                                ¿NO ERES TÚ? <span id='incorrect-user-text-span' onClick={() => setIsUserSelectPopupVisible(true)}>CAMBIAR DE CUENTA</span>
                            </motion.p>
                    </div> 
                }
                </div>
            }

            {userData &&
                <div>
                    {(userData.weddingRole.toUpperCase() === 'ADMIN' && isPassPopupVisible === true) &&
                        <PasswordPopup></PasswordPopup>
                    }
                </div>
            
            }
            
            
            <div id="home-page" className="noselect">
                <motion.div
                    id="home-page-title-container"
                    initial={false}
                    variants={variantHolder}
                    animate={"selected"}
                >
                    {language === 'ENGLISH' && (
                        <>
                            <p id="home-page-title">NOAH & ALE</p>
                            <p id="home-page-subtitle">JUNE 27TH</p>
                        </>
                    )}
                    {language === 'SPANISH' && (
                        <>
                            <p id="home-page-title">NOAH & ALE</p>
                            <p id="home-page-subtitle">JUNE 27TH</p>
                        </>
                    )}
                </motion.div>
                

                <div id="selection-menu-container">
                    <div
                        id='selection-blocker-box'
                        style={{display: inputBlockingboxStatus}}
                    ></div>
                    {userData ? 
                        <div>
                            {userData.weddingRole.toUpperCase() === 'BACHELOR' &&
                                <ul id="selection-menu">
                                    {['INFORMATION', 'VENUE', 'LODGING', 'RSVP', 'REGISTRY', 'BACHELOR'].map((menuItem) => (
                                        <motion.li
                                            key={menuItem}
                                            className="selection-menu-item"
                                            initial={false}
                                            variants={variantHolder}
                                            animate={isSelected(menuItem) ? "selected" : "notSelected"}
                                            onClick={() => handleSelection(menuItem)}
                                            whileHover={{opacity: whileHoverToggle,
                                            transition:{
                                                duration: 0.5
                                            }
                                            }}
                                        >
                                            {language === 'ENGLISH' && menuItem}
                                            {language === 'SPANISH' && translateSpanish(menuItem)}
                                        </motion.li>
                                    ))}
                                </ul>
                            }

                            {userData.weddingRole.toUpperCase() === 'BACHELORETTE' &&
                                <ul id="selection-menu">
                                    {['INFORMATION', 'VENUE', 'LODGING', 'RSVP', 'REGISTRY', 'BACHELORETTE'].map((menuItem) => (
                                        <motion.li
                                            key={menuItem}
                                            className="selection-menu-item"
                                            initial={false}
                                            variants={variantHolder}
                                            animate={isSelected(menuItem) ? "selected" : "notSelected"}
                                            onClick={() => handleSelection(menuItem)}
                                            whileHover={{opacity: whileHoverToggle,
                                            transition:{
                                                duration: 0.5
                                            }
                                            }}
                                        >
                                            {language === 'ENGLISH' && menuItem}
                                            {language === 'SPANISH' && translateSpanish(menuItem)}
                                        </motion.li>
                                    ))}
                                </ul>
                            }

                            {userData.weddingRole.toUpperCase() === 'ADMIN' &&
                                <ul id="selection-menu">
                                    {['INFORMATION', 'VENUE', 'LODGING', 'RSVP', 'REGISTRY', 'ADMIN'].map((menuItem) => (
                                        <motion.li
                                            key={menuItem}
                                            className="selection-menu-item"
                                            initial={false}
                                            variants={variantHolder}
                                            animate={isSelected(menuItem) ? "selected" : "notSelected"}
                                            onClick={() => handleSelection(menuItem)}
                                            whileHover={{opacity: whileHoverToggle,
                                            transition:{
                                                duration: 0.5
                                            }
                                            }}
                                        >
                                            {language === 'ENGLISH' && menuItem}
                                            {language === 'SPANISH' && translateSpanish(menuItem)}
                                        </motion.li>
                                    ))}
                                </ul>
                            }

                            {userData.weddingRole.toUpperCase() === 'GENERAL' &&
                                <ul id="selection-menu">
                                    {['INFORMATION', 'VENUE', 'LODGING', 'RSVP', 'REGISTRY'].map((menuItem) => (
                                        <motion.li
                                            key={menuItem}
                                            className="selection-menu-item"
                                            initial={false}
                                            variants={variantHolder}
                                            animate={isSelected(menuItem) ? "selected" : "notSelected"}
                                            onClick={() => handleSelection(menuItem)}
                                            whileHover={{opacity: whileHoverToggle,
                                            transition:{
                                                duration: 0.5
                                            }
                                            }}
                                        >
                                            {language === 'ENGLISH' && menuItem}
                                            {language === 'SPANISH' && translateSpanish(menuItem)}
                                        </motion.li>
                                    ))}
                                </ul>
                            }
                        </div>
                    :
                        <ul id="selection-menu">
                            {['INFORMATION', 'VENUE', 'LODGING', 'RSVP', 'REGISTRY'].map((menuItem) => (
                                <motion.li
                                    key={menuItem}
                                    className="selection-menu-item"
                                    initial={false}
                                    variants={variantHolder}
                                    animate={isSelected(menuItem) ? "selected" : "notSelected"}
                                    onClick={() => handleSelection(menuItem, true)}
                                    whileHover={{opacity: whileHoverToggle,
                                    transition:{
                                        duration: 0.5
                                    }
                                    }}
                                >
                                    {language === 'ENGLISH' && menuItem}
                                    {language === 'SPANISH' && translateSpanish(menuItem)}
                                </motion.li>
                            ))}
                        </ul>
                    }

                    
                </div>
            </div>
            <UserSelectPopup isRsvpClick={isRsvpClick} setWhileHoverToggle={setWhileHoverToggle} setInputBlockingboxStatus={setInputBlockingboxStatus} setVariantHolder={setVariantHolder} setSelectedItem={setSelectedItem} isUserSelectPopupVisible={isUserSelectPopupVisible} setIsUserSelectPopupVisible={setIsUserSelectPopupVisible}></UserSelectPopup>
        </div>
    );
}

export default Home;
