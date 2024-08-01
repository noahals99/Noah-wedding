import BackButton from "../components/BackButton"
import { useState,useEffect,useContext } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { apiUrlStart } from "./Root";
import { UserContext } from "./Root";
import { useNavigate } from 'react-router-dom';
import GroupsButton from "../components/GroupsButton";


function PlusIcon({toggleDataHasChanged}) {
    const apiUrl = `${apiUrlStart}/addUser`;
    const handleAddUser = () => {
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
            }
        })
        .then((response) => {
            toggleDataHasChanged();
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return(
        <svg onClick={handleAddUser} className="plus-icon" width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="none" strokeWidth="4" stroke="black"/>
            <path d="M20 12V28M12 20H27" stroke="black" strokeWidth="4" strokeLinecap="round"/>
        </svg>

    )
}




function Admin(){
    const { hasSeenHome } = useContext(UserContext);
    const [isVisible, toggleVisible] = useState(false);
    const [usersData, setUsersData] = useState(null);
    const [dataHasChanged, setDataHasChanged] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupVisible, setIsPopupVisible] =useState(false);
    const wedbsiteURL = "https://alsina-wedding.netlify.app/";
    const navigate = useNavigate();

    useEffect(()=> {
        if(hasSeenHome === true){
            toggleVisible(true);
        }else{
            navigate(`/`);
        }
        
    },[]);

    useEffect(()=> {
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
                setUsersData(response.data)
            })
            .catch((error) => {
              window.localStorage.removeItem("access_token");
              console.log(error);
            })
    },[dataHasChanged]);


    const toggleDataHasChanged = () => {
        if(dataHasChanged === true){
            setDataHasChanged(false);
        }else{
            setDataHasChanged(true);
        }
    }
    
    const toggleIsPopupVisible = () => {
        if(isPopupVisible === true){
            setIsPopupVisible(false);
        }else{
            setIsPopupVisible(true);
        }
    }

    const handleClick = (user) => {
        setSelectedUser(user);
        toggleDataHasChanged();
        toggleIsPopupVisible();
    }

    const getPopupVisibility = () => {
        if(isPopupVisible === true){
            return {"display": "flex"}
        }else{
            return {"display": "none"}
        }
    }

    const handleBackgroundClick = (event) => {
        if(event.target.id === "user-popup-admin"){
            toggleIsPopupVisible();
        }
    }

    const handleRsvpClick = () => {
        navigate('/admin-setup/rsvp')
    }

    const handleCopyClick = (id) => {
        navigator.clipboard.writeText(id)
    }
    const handleCopyLinkClick = (id) => {
        navigator.clipboard.writeText(`${wedbsiteURL}?id=${id}`)
    }

    return(
        <div className='app-background-color'>
            <GroupsButton isVisible={isVisible} toggleVisible={toggleVisible}></GroupsButton>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <button id="admin-rsvp-button" onClick={handleRsvpClick}>RSVP</button>
            <div id="user-cards-container">
                {usersData &&
                    usersData.map((user) => {
                        return(
                            <div key={user._id} className="user-line">
                                <button onClick={() => handleClick(user)}>Edit</button>
                                <div className="user-line-name-container">
                                    <p className="user-line-first-name">{user.firstName}</p>
                                    <p>{user.lastName}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleCopyClick(user._id)}>copy id</button>
                                    <button onClick={() => handleCopyLinkClick(user._id)}>copy id link</button>
                                </div>
                                
                            </div>
                        )
                    })
                }
                <div id="plus-icon-container">
                    <PlusIcon toggleDataHasChanged={toggleDataHasChanged}></PlusIcon>
                </div>
                
            </div>
            <div id="user-popup-admin" style={getPopupVisibility()} onClick={handleBackgroundClick}>
                {(selectedUser)&&
                    <UserCard toggleIsPopupVisible={toggleIsPopupVisible} usersDataObject={selectedUser} toggleDataHasChanged={toggleDataHasChanged} dataHasChanged={dataHasChanged}></UserCard>
                }
            </div>
        </div>
    )
}


export default Admin