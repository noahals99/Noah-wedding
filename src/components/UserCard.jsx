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
            const apiUrl = `${apiUrlStart}/deleteUser`;
            axios({
                method: "POST",
                url: apiUrl,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    _id: id,
                    RsvpId: RsvpId,
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




function UserCard({usersDataObject, toggleDataHasChanged, dataHasChanged}){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [language, setLanguage] = useState("");
    const [weddingRole, setWeddingRole] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => {
        if( isEditing === true){
            setIsEditing(false);
        }else{
            setIsEditing(true);
        }
    }

    const roleOptions = [
        { value: 'GENERAL', label: 'General' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'BACHELOR', label: 'Bachelor' },
        { value: 'BACHELORETTE', label: 'Bachelorette' },
      ]

    const languageOptions = [
        { value: 'SPANISH', label: 'Spanish' },
        { value: 'ENGLISH', label: 'English' },
      ]

    useEffect(() => {
        if(userData.firstName){
            setFirstName(userData.firstName);
        }
        if(userData.lastName){
            setLastName(userData.lastName);
        }
        if(userData.email){
            setEmail(userData.email);
        }
        if(userData.familyName){
            setFamilyName(userData.familyName);
        }
        if(userData.language){
            setLanguage(userData.language);
        }
        if(userData.weddingRole){
            setWeddingRole(userData.weddingRole);
        }
    },[dataHasChanged])

    const handleValueChange = (event, input) => {

        switch (input) {
            case "firstName":
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "familyName":
                setFamilyName(event.target.value);
                break;
            case "language":
                setLanguage(event.value);
                break;
            case "weddingRole":
                setWeddingRole(event.value);
        }
        
    }

    const handleSubmit = () => {
        toggleIsEditing();
        const apiUrl = `${apiUrlStart}/editUser`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                '_id': userData._id,
                'email': email,
                'firstName': firstName,
                'lastName': lastName,
                'familyName': familyName,
                'language': language,
                'weddingRole': weddingRole,
            }
        })
        .then((response) => {
        })
        .catch((error) => {
            console.log(error)
        })
    }


    const userData = usersDataObject;
    return(
        <div className="UserCard">
            <DeleteButton id={userData._id} toggleDataHasChanged={toggleDataHasChanged} RsvpId={userData.rsvpSelection}></DeleteButton>
            <EditButton toggleIsEditing={toggleIsEditing} isEditing={isEditing}></EditButton>
            
            <div className="user-card-aligner">
                <div className="card-info-section">
                    <p>ID</p>
                    <p className="userId-admin">{userData._id}</p>
                    
                </div>
                <div className="card-info-section">
                    <p>First Name</p>
                    {isEditing ? 
                        <input type="text" className="input-box" value={firstName} onChange={(event) => handleValueChange(event, "firstName")}></input> :
                        <p className="display-info">{firstName}</p>
                    }
                    
                </div>
                <div className="card-info-section">
                    <p>Last Name</p>
                    {isEditing ? 
                        <input type="text" className="input-box" value={lastName} onChange={(event) => handleValueChange(event, "lastName")}></input> :
                        <p className="display-info">{lastName}</p>
                    }
                </div>
                <div className="card-info-section">
                    <p>Email</p>
                    {isEditing ? 
                        <input type="text" className="input-box" value={email} onChange={(event) => handleValueChange(event, "email")}></input> :
                        <p className="display-info">{email}</p>
                    }
                </div>
                <div className="card-info-section">
                    <p>Family Name</p>
                    {isEditing ? 
                        <input type="text" className="input-box" value={familyName} onChange={(event) => handleValueChange(event, "familyName")}></input> :
                        <p className="display-info">{familyName}</p>
                    }
                </div>
                <div className="card-info-section">
                    <p>Language</p>
                    {isEditing ? 
                        <Select options={languageOptions} placeholder={language} className="selection-box" styles={customStyles} onChange={(event) => handleValueChange(event, "language")}/>:
                        <p className="display-info">{language}</p>
                    }
                </div>
                <div className="card-info-section">
                    <p>Wedding Role</p>
                    {isEditing ? 
                        <Select options={roleOptions} placeholder={weddingRole} className="selection-box" styles={customStyles} onChange={(event) => handleValueChange(event, "weddingRole")}/> :
                        <p className="display-info">{weddingRole}</p>
                    }
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

export default UserCard