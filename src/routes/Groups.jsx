import BackButton from "../components/BackButton"
import { useState,useEffect,useContext } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { apiUrlStart } from "./Root";
import { UserContext } from "./Root";
import { useNavigate } from 'react-router-dom';
import GroupsButton from "../components/GroupsButton";
import GroupsCard from "../components/GroupsCard";


function PlusIcon({toggleDataHasChanged}) {
    const apiUrl = `${apiUrlStart}/addGroup`;
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




function Groups(){
    const { hasSeenHome } = useContext(UserContext);
    const [isVisible, toggleVisible] = useState(false);
    const [groupData, setGroupData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [dataHasChanged, setDataHasChanged] = useState(false);
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

    useEffect(()=> {
        let apiUrl = `${apiUrlStart}/getAllGroups`;
        axios({
            method: "GET",
            url: apiUrl,
            headers: { 
              'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`, 
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((response) => {
                setGroupData(response.data)
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
    
    return(
        <div className='app-background-color'>
            <GroupsButton isVisible={isVisible} toggleVisible={toggleVisible}></GroupsButton>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <div id="user-cards-container">
                {groupData &&
                    groupData.map((group) => {
                        return(
                            <GroupsCard groupDataObject={group} userData={usersData} toggleDataHasChanged={toggleDataHasChanged} key={group._id}></GroupsCard>
                        )
                    })
                }
                <PlusIcon toggleDataHasChanged={toggleDataHasChanged}></PlusIcon>
            </div>
            
        </div>
    )
}

export default Groups