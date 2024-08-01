import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { apiUrlStart } from "./Root";

const BackButtonRsvp = ({}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/admin-setup")
    }
    return(
        <div>
            <button id='rsvp-admin-back-button' onClick={handleClick}>Back</button>
        </div>
    )
}


function AdminRsvp({}){
    const [usersData, setUsersData] = useState(null);
    


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
    },[]);

    return(
        <div className='app-background-color'>
            <BackButtonRsvp />
            <div id="user-cards-container">
            {(usersData) &&
                <div id='rsvp-admin-container'>
                    <div id='admin-rsvp-grid'>
                        <div id='admin-rsvp-row-container'>
                            <div id='admin-rsvp-title-row' className='admin-rsvp-row'>
                                <div className='admin-rsvp-cell'>
                                    <p>Name</p>
                                </div>
                                <div className='admin-rsvp-cell'>
                                    <p className='admin-rsvp-column'>Will Attend</p>
                                </div>
                                <div className='admin-rsvp-cell'>
                                    <p>Dietary Restrictions</p>
                                </div>
                            </div>
                        </div>
                        {usersData.map((user) => {
                            if(user.firstName !== "Admin"){
                                return(
                                    <div className='admin-rsvp-row' key={user._id}>
                                        <div className='admin-rsvp-cell'>
                                            <p>{user.firstName} {user.lastName}</p>
                                        </div>
                                        <div className='admin-rsvp-cell'>
                                            {(user.rsvpSelection.willAttend.length > 0) ?
                                                <p>{user.rsvpSelection.willAttend}</p>:
                                                <p>-</p>
                                            }
                                        </div>
                                        <div className='admin-rsvp-cell'>
                                            {(user.rsvpSelection.dietaryRestrictions) ?
                                                <p>{user.rsvpSelection.dietaryRestrictions}</p>:
                                                <p>-</p>
                                            }
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div key={user._id}>
                                    </div>
                                )
                            }
                            
                        })
                        }
                    </div>
                </div>
                    
            }
            </div>
        </div>
    )
}

export default AdminRsvp