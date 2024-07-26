import { useEffect, useState } from "react"
import Select from 'react-select';
import axios from "axios";
import { adminId, apiUrlStart } from "../routes/Root";
import ConfirmationPopup from "./ConfirmationPopup";


const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };


const invisibleStyle = {
    visibility: "hidden"
}

const visibleStyle = {
    visibility: "visible"
}




const EditButton = ({toggleIsEditing, isEditing}) => {
    const rand1 = Math.random()
    const handleEditClick = () => {
        toggleIsEditing();
    }

    const getVisibleStatus = () => {
        
        if(isEditing === true){
            return invisibleStyle
        } else{
            return visibleStyle
        }
    }

    return(
        <svg width="50" height="50" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleEditClick} className="edit-button" style={getVisibleStatus()}>
            <circle cx="10" cy="10" r="9.75" fill="white" stroke="black" strokeWidth="0.5"/>
            <g clipPath="url(#clip0_0_1)">
            <path d="M5.41773 12.7786L5 15L7.22145 14.5823L13.2311 8.57265L11.4273 6.76892L5.41773 12.7786ZM6.98247 14.1294L5.61304 14.387L5.87054 13.0175L11.4273 7.46072L12.5393 8.57265L6.98247 14.1294Z" fill="black"/>
            <path d="M13.1963 5L11.8427 6.35362L13.6464 8.15732L15 6.8037L13.1963 5ZM12.5345 6.35362L13.1963 5.6918L14.3082 6.8037L13.6464 7.46552L12.5345 6.35362Z" fill="black"/>
            </g>
            <defs>
            <clipPath id={`clip0_0_1${rand1}`} >
            <rect width="10" height="10" fill="white" transform="translate(5 5)"/>
            </clipPath>
            </defs>
        </svg>

    )
}

const DeleteButton = ({id, toggleDataHasChanged, RsvpId}) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisible = () => {
        if(isVisible === false){
            setIsVisible(true);
        } else{
            setIsVisible(false);
        }
    }

    const checkVisibility = () => {
        if(isVisible === false){
            return invisibleStyle
        } else{
            return visibleStyle
        }
    }

    const handleDeleteClick = () => {
        toggleVisible();
    }

    const handleCancelClick = () => {
        toggleVisible();
    }
    
    const handleConfirmClick = () => {
        if(id !== adminId){
            const apiUrl = `${apiUrlStart}/deleteGroup`;
            axios({
                method: "POST",
                url: apiUrl,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    id: id,
                }
            })
            .then((response) => {
                toggleDataHasChanged();
                toggleVisible();
            })
            .catch((error) => {
                console.log(error)
            })
        }else{
            toggleVisible();
        }
    }

    return(
        <div>
            <ConfirmationPopup checkVisibility={checkVisibility} handleConfirmClick={handleConfirmClick} handleCancelClick={handleCancelClick}></ConfirmationPopup>
            <svg className="delete-button" width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleDeleteClick}>
                <path d="M6.78419 11H15.2604M21.2156 11C21.2156 16.5228 16.7385 21 11.2156 21C5.69276 21 1.21561 16.5228 1.21561 11C1.21561 5.47715 5.69276 1 11.2156 1C16.7385 1 21.2156 5.47715 21.2156 11Z" fill="white" stroke="black" strokeLinecap="round"/>
            </svg>
        </div>
        
    )
}



const AddUserButton = ({userData, members, groupId, toggleDataHasChanged}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUsers, setShowUsers] = useState(false);

    const getStyle = () => {
        if(showUsers === true){
            return {"visibility": "visible"}
        }else{
            return {"visibility": "hidden"}
        }
    }

    const toggleVisible = () => {
        if(showUsers === true){
            setShowUsers(false);
        }else{
            setShowUsers(true);
        }
    }

    const handleSelect = (user) => {
        setSelectedUser(user);
        toggleVisible();
    }

    const handleAddUser = () => {
        if(selectedUser){
            const apiUrl = `${apiUrlStart}/addUserToGroup`;
            axios({
                method: "POST",
                url: apiUrl,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    id: groupId,
                    userId: selectedUser._id,
                }
            })
            .then((response) => {
                toggleDataHasChanged();
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }


    return(
        <div className="add-user-container">
            <div className="add-user-selected-box"  onClick={toggleVisible}>
                {(selectedUser) ? 
                    <p className="add-user-selected-text">{selectedUser.firstName} {selectedUser.lastName}</p>:
                    <p className="add-user-selected-text"></p>
                }
            </div>
            <div>
                    {(userData) &&
                            <div className="user-selection-container" style={getStyle()}>
                                {userData.map((user) => {
                                    if(members.findIndex((a) => a._id == user._id) === -1){
                                        return(
                                            <div key={`addUser${user._id}`} className="user-selection-item" onClick={() => handleSelect(user)}>
                                                <p>{user.firstName} {user.lastName}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        }
                </div>
            <button className="add-user-group-button" onClick={handleAddUser}>ADD</button>
        </div>
    )
}



function GroupsCard({groupDataObject, toggleDataHasChanged, userData}){
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => {
        if( isEditing === true){
            setIsEditing(false);
        }else{
            setIsEditing(true);
        }
    }

    const handleValueChange = (event, input) => {

        switch (input) {
            case "groupName":
                setGroupName(event.target.value);
                break;
        }
        
    }

    useEffect(() => {
        if(groupDataObject.members){
            setMembers(groupDataObject.members);
        }
        if(groupDataObject.name){
            setGroupName(groupDataObject.name);
        }
    },[groupDataObject])

    const handleSubmit = () => {
        toggleIsEditing();
        const apiUrl = `${apiUrlStart}/editGroup`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                id: groupDataObject._id,
                name: groupName,
            }
        })
        .then((response) => {
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleRemoveFromList = (userId) => {
        
        const apiUrl = `${apiUrlStart}/removeFromGroup`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                id: groupDataObject._id,
                userId: userId,
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
        <div className="UserCard">
            <div className="buttons-container">
                <DeleteButton id={groupDataObject._id} toggleDataHasChanged={toggleDataHasChanged}></DeleteButton>
                <EditButton toggleIsEditing={toggleIsEditing} isEditing={isEditing}></EditButton>
            </div>
            
            <div className="user-card-aligner">
                <div className="card-info-section">
                    <p>ID</p>
                    <p>{groupDataObject._id}</p>
                </div>
                <div className="card-info-section">
                    <p>Group Name</p>
                    {isEditing ? 
                        <input type="text" className="input-box" value={groupName} onChange={(event) => handleValueChange(event, "groupName")}></input> :
                        <p className="display-info">{groupName}</p>
                    }
                    
                </div>
                <div className="card-info-section">
                    <p>Group Members</p>
                    {(members) &&
                        <div>
                            {members.map((member) => {
                                return(
                                    <div className="group-member-list" key={`member-list-${member._id}`}>
                                        <p>{member.firstName}</p>
                                        <div className="group-member-list-remove" onClick={() => handleRemoveFromList(member._id)}>
                                            <p>x</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <AddUserButton userData={userData} members={members} groupId={groupDataObject._id} toggleDataHasChanged={toggleDataHasChanged}></AddUserButton>
                    
                    
                </div>
                <div>
                    {isEditing && 
                        <button onClick={handleSubmit}  className="submit-button">SUBMIT</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default GroupsCard