import { Outlet } from "react-router-dom";
import { useState, createContext,useEffect } from "react";
import axios from 'axios';

export const languageContext = createContext(null);
export const UserContext = createContext(null);
/*export const apiUrlStart = "http://localhost:8080/api"*/
export const apiUrlStart = "https://backend-late-frost-3509.fly.dev/api"
export const adminId = "66820a3e475c3dd2a5f87f24"



function Root(){
    const [language, setLanguage] = useState("ENGLISH");
    const [userKey, setUserKey] = useState(null);
    const [userData, setUserData] = useState(null);
    const [hasSeenHome, setHasSeenHome] = useState(true);
    const [userDataHasChanged, setUserDataHasChanged] = useState(false);
    const [isUserKeyLoading, setIsUserKeyLoading] = useState(true);

    useEffect(() => {
        if(isUserKeyLoading === false){
            if(window.localStorage.getItem("userId") !== null){
                setUserKey(window.localStorage.getItem("userId"));
            }
        }
       
    },[isUserKeyLoading])


    useEffect(() => {
        if(userKey !== null){
            let apiUrl = `${apiUrlStart}/getUser/${userKey}`;
            axios({
                method: "GET",
                url: apiUrl,
                headers: { 
                }
              })
                .then((response) => {
                    console.log(response)
                    setUserData(response.data)
                    if((response.data.language.toUpperCase() === "ENGLISH") || (response.data.language.toUpperCase() === "SPANISH")){
                        setLanguage(response.data.language.toUpperCase());
                    }
                    window.localStorage.setItem("userId", userKey);
                })
                .catch((error) => {
                  window.localStorage.removeItem("userId");
                  console.log(error);
                })
        }
    },[userKey, userDataHasChanged])

    const toggleUserDataHasChanged = () => {
        if(userDataHasChanged === true){
            setUserDataHasChanged(false);
        }else{
            setUserDataHasChanged(true);
        }
    }

    return(
        <UserContext.Provider value={{userKey, setUserData, setUserKey, userData, hasSeenHome, setHasSeenHome, setIsUserKeyLoading, toggleUserDataHasChanged, isUserKeyLoading}}>
            <languageContext.Provider value={{language, setLanguage}}>
                <Outlet/>
            </languageContext.Provider>
        </UserContext.Provider>
        
    )
}

export default Root