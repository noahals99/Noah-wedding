import venueImg from '../../public/venueStock.jpeg'
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { languageContext } from './Root';
import { useEffect, useState,useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';
import AsyncSelect from 'react-select/async'
import { apiUrlStart } from './Root';
import SongDisplay from '../components/SongDisplay';
import SelectedSongsDisplay from '../components/SelectedSongsDisplay';
import { UserContext } from './Root';
import SubmitConfirmationPopup from '../components/SubmitConfirmationPopup';

const imgVariants = {
    invisible: {
        opacity: 0,
        transition: {
            duration: 1,
            delay:1
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
        }
    }
}

const titleVariants = {
    invisible: {
        opacity: 0,
        transition: {
            duration: 1,
            delay:0.4
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delay:0.8
        }
    }
}

const infoVariants = {
    invisible: {
        opacity: 0,
        transition: {
            duration: 1,
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delay:1.5
        }
    }
}


const DietaryRestrictionsInput = ({userId, dietaryRestrictionsUsers, setDietaryRestrictionsUsers}) => {
    const handleChange = (event) => {
        const newObject = {...dietaryRestrictionsUsers};
        newObject[userId] = event.target.value
        setDietaryRestrictionsUsers(newObject);
    }

    return(
        <div className='dietary-restrictions-input-container'>
            <input type='text' value={dietaryRestrictionsUsers[userId]} onChange={handleChange} className='dietary-restrictions-input'></input>
        </div>
    )
}

const CheckBox = ({removeConfirmedUser, addConfirmedUser, userid, removeNotGoingUser, addNotGoingUser, isRsvp}) => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleIsChecked = () => {
        if(isChecked === true){ 
            removeConfirmedUser(userid);
            if(isRsvp === true){
                addNotGoingUser(userid);
            }
            setIsChecked(false);
        }else{
            addConfirmedUser(userid);
            if(isRsvp === true){
                removeNotGoingUser(userid);
            }
            setIsChecked(true);
        };
    }

    const checkboxVariants = {
        checked: {
            scale: 1
        },
        unchecked: {
            scale: 0
        }
    }


    return(
        <div className='checkbox-container' onClick={toggleIsChecked}>
            <motion.div className='checkbox-inside' variants={checkboxVariants} animate={isChecked ? "checked" : "unchecked"} initial={false}>
            </motion.div>
        </div>
    )
}

const GroupRsvp = ({ setNotGoingUsers, userData, addConfirmedUser, removeConfirmedUser, addNotGoingUser, removeNotGoingUser, isRsvp}) => {
    useEffect(() => {
        if(isRsvp === true){
            setNotGoingUsers(userData.group.members.map((user) => user._id))
        }
        
    },[])
    return(
        <div className='group-rsvp-box'>
            
            {userData.group.members.map((user, index) => {
                return(
                    <div key={`grouprsvp${index}${user._id}`} className='name-checkbox-container'>
                        <div className='name-aligner'>
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                        <CheckBox isRsvp={isRsvp} addConfirmedUser={addConfirmedUser} removeConfirmedUser={removeConfirmedUser} addNotGoingUser={addNotGoingUser} removeNotGoingUser={removeNotGoingUser} userid={user._id}></CheckBox>
                    </div>
                )
            })

            }
        </div>
    )
}

const GroupDiet = ({userData, dietaryRestrictionsUsers, addDietaryRestrictionsUsers, removeDietaryRestrictionsUsers, setDietaryRestrictionsUsers}) => {
    return(
        <div className='group-rsvp-box'>
            
            {userData.group.members.map((user, index) => {
                return(
                    <div key={`grouprsvp${index}${user._id}`} className='name-checkbox-container-diet'>
                        <div className='name-container'>
                            <div className='name-aligner'>
                                <p>{user.firstName} {user.lastName}</p>
                            </div>
                            <CheckBox addConfirmedUser={addDietaryRestrictionsUsers} removeConfirmedUser={removeDietaryRestrictionsUsers} userid={user._id}></CheckBox>
                        </div>
                        
                        {(user._id in dietaryRestrictionsUsers) &&
                            <DietaryRestrictionsInput userId={user._id} dietaryRestrictionsUsers={dietaryRestrictionsUsers} setDietaryRestrictionsUsers={setDietaryRestrictionsUsers}></DietaryRestrictionsInput>
                        }
                    </div>
                )
            })

            }
        </div>
    )
}



function Rsvp() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;
    const [songSearch, setSongSearch] = useState("")
    const [searchResults, setSearchResults] = useState(null)
    const [listVisible, setListVisible] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [selectedSongsId, setSelectedSongsId] = useState([]);
    const navigate = useNavigate();
    const [confirmedUsers, setConfirmedUsers] = useState([]);
    const [notGoingUsers, setNotGoingUsers] = useState([]);
    const [dietaryRestrictionsUsers, setDietaryRestrictionsUsers] = useState({});
    const {userData,setIsUserKeyLoading, toggleUserDataHasChanged} = useContext(UserContext);
    const [isConfirmSubmitVisible, setIsConfirmSubmitVisible] = useState(false);

    useEffect(() => {
        if(!userData){
            navigate("/");
        }
    },[])


    useEffect(() => {
        if(!userData){
            navigate("/")
        }
    }, [userData])

    const checkVisibility = () => {
        if(isConfirmSubmitVisible === true){
            return {"visibility": "visible"};
        }else{
            return {"visibility": "hidden"};
        };
    };

    const toggleIsConfirmSubmitVisible = () => {
        if(isConfirmSubmitVisible === true){
            setIsConfirmSubmitVisible(false);
        }else{
            setIsConfirmSubmitVisible(true);
        };
    };

    const submitButtonClick = () => {
        toggleIsConfirmSubmitVisible()
    }

    const handleCancelClick = () => {
        toggleIsConfirmSubmitVisible()
    }

    const handleSubmit = () => {
        const apiUrl = `${apiUrlStart}/submitRsvp`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                confirmedUsers : confirmedUsers,
                dietaryRestrictions : dietaryRestrictionsUsers,
                selectedSongs : selectedSongs,
                notGoingUsers : notGoingUsers,
            }
        })
        .then((response) => {
            toggleUserDataHasChanged();
            toggleIsConfirmSubmitVisible();
            setTimeout(() => {
                navigate("/");
            },1000)

            

            
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setIsUserKeyLoading(false)
       
    },[])

    const addConfirmedUser = (userId) => {
        const newUserList = [...confirmedUsers, userId];
        setConfirmedUsers(newUserList);
    }

    const removeConfirmedUser = (userId) => {
        const newUserList = confirmedUsers.filter((id) => id != userId);
        setConfirmedUsers(newUserList);
    }

    const addNotGoingUser = (userId) => {
        const newUserList = [...notGoingUsers, userId];
        setNotGoingUsers(newUserList);
    }

    const removeNotGoingUser = (userId) => {
        const newUserList = notGoingUsers.filter((id) => id != userId);
        setNotGoingUsers(newUserList);
    }


    const addDietaryRestrictionsUsers = (userId) => {
        const newUserList = {...dietaryRestrictionsUsers};
        newUserList[userId] = ""
        setDietaryRestrictionsUsers(newUserList);
    }

    const removeDietaryRestrictionsUsers = (userId) => {
        const newUserList = {...dietaryRestrictionsUsers};
        delete newUserList[userId];
        setDietaryRestrictionsUsers(newUserList);
    }

    useEffect(() => {
        const apiUrl = `${apiUrlStart}/getSpotifyResults`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                'searchQuery': songSearch 
            }
        })
        .then((response) => {
            setSearchResults(response.data.items);
        })
        .catch((error) => {
            console.log(error)
        })
    },[songSearch])

    const isListVisible = () => {
        if(listVisible === true){
            return {'visibility': 'visible'}
        }else{
            return {'visibility': 'hidden'}
        }
    }

    const toggleListVisibility = () => {
        if(listVisible === true){
            setListVisible(false);
        }else{
            
            setListVisible(true);   
        }
    }

    const onFocus = () => {
        if(searchResults){
            toggleListVisibility()
        }
        
    }


    useEffect(()=> {
        toggleVisible(true);
    },[])


    const handleSearchChange = (event) => {
        setSongSearch(event.target.value)
    }

    useEffect(() => {
        if(searchResults){
            toggleListVisibility()
        }
    },[searchResults])

    return(
        
        <div className='app-background-color noselect'>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={"https://morethanjustparks.com/wp-content/uploads/2022/07/shutterstock_684910513-sourdough-mountain-diablo-lake-north-cascdes-Dmitry-Kovba.jpg"} id='venue-img'></img>
                
                {language === 'ENGLISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>RSVP</motion.p>
                )}
                {language === 'SPANISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>RSVP</motion.p>
                )}
                <motion.div className='page-title-shadow'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}></motion.div>
            </motion.div>
            <div id='venue-info-section'>
                {language === 'ENGLISH' && (
                    
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        {(userData) &&
                            <div>
                                {!(userData.rsvpSelection.willAttend != "") ?
                                    <div>
                                        <div className='subsection subsection-rsvp'>
                                        <p className='subsection-title'>WILL YOU BE ATTENDING?</p>
                            
                                        {(userData) &&
                                            <div>
                                                {(userData.group) ?
                                                    <div>
                                                        <p className='subsection-info-small'>CHECK BOXES FOR EVERYONE WHO WILL BE ATTENDING</p>
                                                        <GroupRsvp setNotGoingUsers={setNotGoingUsers} isRsvp={true} addNotGoingUser={addNotGoingUser} removeNotGoingUser={removeNotGoingUser} addConfirmedUser={addConfirmedUser} removeConfirmedUser={removeConfirmedUser} userData={userData}></GroupRsvp>
                                                    </div>  :
                                                    <div>
                                                        <p className='subsection-info-small'>CHECK THE BOX IF YOU WILL BE ATTENDING</p>
                                                        <div className='name-checkbox-container-single'>
                                                            <div className='name-aligner'>
                                                                <p>{userData.firstName} {userData.lastName}</p>
                                                            </div>
                                                            <CheckBox addConfirmedUser={addConfirmedUser} removeConfirmedUser={removeConfirmedUser} userid={userData._id}></CheckBox>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                            
                            
                            
                            
                                        </div>
                                        
                                        <div className='subsection subsection-rsvp'>
                                            <p className='subsection-title'>DIETARY RESTRICTIONS</p>
                                            {(userData) &&
                                                <div>
                                                    {(userData.group) ?
                                                        <div>
                                                            <p className='subsection-info-small'>CHECK THE BOX OF ANYONE WITH DIETARY RESTRICTIONS</p>
                                                            <GroupDiet setDietaryRestrictionsUsers={setDietaryRestrictionsUsers} dietaryRestrictionsUsers={dietaryRestrictionsUsers} addDietaryRestrictionsUsers={addDietaryRestrictionsUsers} removeDietaryRestrictionsUsers={removeDietaryRestrictionsUsers} userData={userData}></GroupDiet>
                                                        </div>  :
                                                        <div>
                                                            <p className='subsection-info-small'>CHECK THE BOX IF YOU HAVE ANY DIETARY RESTRICTIONS</p>
                                                            <div className='input-name-container'>
                                                                <div className='name-checkbox-container-single'>
                                                                    <div className='name-aligner'>
                                                                        <p>{userData.firstName} {userData.lastName}</p>
                                                                    </div>
                                                                    <div className='checkbox-conatiner'>
                                                                        <CheckBox addConfirmedUser={addDietaryRestrictionsUsers} removeConfirmedUser={removeDietaryRestrictionsUsers} userid={userData._id}></CheckBox>
                                                                        
                                                                    </div>
                                                                </div>
                                                                {(userData._id in dietaryRestrictionsUsers) &&
                                                                            <div>
                                                                                <DietaryRestrictionsInput userId={userData._id} dietaryRestrictionsUsers={dietaryRestrictionsUsers} setDietaryRestrictionsUsers={setDietaryRestrictionsUsers}></DietaryRestrictionsInput>
                                                                            </div>
                                                                }
                                                            </div>
                                                            
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className='subsection' id='song-subsection'>
                                            <p id='song-select-section-title' className='subsection-title'>WANT TO HEAR A SONG? SO DO WE! SUGGEST SOME...</p>
                                            <p className='subsection-info-small'>TAP A SELECTED SONG TO REMOVE</p>
                                            <SelectedSongsDisplay selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs}></SelectedSongsDisplay>
                                            {(userData.group) ? 
                                                <div>
                                                    {(Object.keys(selectedSongs).length != userData.group.members.length * 2) ?
                                                        <p id='selected-count-text'>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {userData.group.members.length * 2}</p>:
                                                        <p id='selected-count-text' style={{color:"red"}}>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {userData.group.members.length * 2}</p>
                                                    }
                                                </div>:
                                                <div>
                                                    {(Object.keys(selectedSongs).length != 2) ?
                                                        <p id='selected-count-text'>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of 2</p>:
                                                        <p id='selected-count-text' style={{color:"red"}}>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {2}</p>
                                                    }
                                                </div>
                                            }
                                            
                                            {(userData.group) ? 
                                                <>
                                                    <p id='search-song-title'>SEARCH FOR A SONG</p>
                                                    <input type="text" className="input-box-song-search" value={songSearch} onChange={handleSearchChange} onFocus={onFocus} onBlur={toggleListVisibility}></input>
                                                    <div id='search-results-container' style={isListVisible()}>
                                                        {searchResults &&
                                                        searchResults.map((item) => {
                                                            return(
                                                                <SongDisplay item={item} key={item.id} setSongSearch={setSongSearch} isListVisible={isListVisible} setSelectedSongs={setSelectedSongs} maxAmount={userData.group.members.length * 2} selectedSongs={selectedSongs}></SongDisplay>
                                                            )
                                                        })

                                                        }
                                                    </div>
                                                </>:
                                                <>
                                                    <p id='search-song-title'>SEARCH FOR A SONG</p>
                                                    <input type="text" className="input-box-song-search" value={songSearch} onChange={handleSearchChange} onFocus={onFocus} onBlur={toggleListVisibility}></input>
                                                    <div id='search-results-container' style={isListVisible()}>
                                                        {searchResults &&
                                                        searchResults.map((item) => {
                                                            return(
                                                                <SongDisplay item={item} key={item.id} setSongSearch={setSongSearch} isListVisible={isListVisible} setSelectedSongs={setSelectedSongs} maxAmount={2} selectedSongs={selectedSongs}></SongDisplay>
                                                            )
                                                        })

                                                        }
                                                    </div>
                                                </>
                                            }
                                            
                                            
                                        </div>
                                        <div className='submit-button-section'>
                                            {

                                            }
                                            <button className='submit-button rsvp-submit' onClick={submitButtonClick}>SUBMIT</button>
                                        </div>
                                        
                                    </div>
                                    :
                                    <div className='already-submitted-container'>
                                        <div className='already-submitted-text-subcontainer'>
                                            <p className='already-submitted-container-title'>RSVP HAS BEEN SUBMITTED</p>
                                            <p className='already-submitted-container-subtitle'>TO MAKE ANY ADJUSTMENTS TO RSVP PLEASE REACH OUT TO NOAH OR ALE DIRECTLY</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        
                        <SubmitConfirmationPopup handleConfirmClick={handleSubmit} handleCancelClick={handleCancelClick} checkVisibility={checkVisibility}></SubmitConfirmationPopup>
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        {(userData) &&
                            <div>
                                {!(userData.rsvpSelection.willAttend != "") ?
                                    <div>
                                        <div className='subsection subsection-rsvp'>
                                        <p className='subsection-title'>WILL YOU BE ATTENDING?</p>
                            
                                        {(userData) &&
                                            <div>
                                                {(userData.group) ?
                                                    <div>
                                                        <p className='subsection-info-small'>CHECK BOXES FOR EVERYONE WHO WILL BE ATTENDING</p>
                                                        <GroupRsvp setNotGoingUsers={setNotGoingUsers} isRsvp={true} addNotGoingUser={addNotGoingUser} removeNotGoingUser={removeNotGoingUser} addConfirmedUser={addConfirmedUser} removeConfirmedUser={removeConfirmedUser} userData={userData}></GroupRsvp>
                                                    </div>  :
                                                    <div>
                                                        <p className='subsection-info-small'>CHECK THE BOX IF YOU WILL BE ATTENDING</p>
                                                        <div className='name-checkbox-container-single'>
                                                            <div className='name-aligner'>
                                                                <p>{userData.firstName} {userData.lastName}</p>
                                                            </div>
                                                            <CheckBox addConfirmedUser={addConfirmedUser} removeConfirmedUser={removeConfirmedUser} userid={userData._id}></CheckBox>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                            
                            
                            
                            
                                        </div>
                                        
                                        <div className='subsection subsection-rsvp'>
                                            <p className='subsection-title'>DIETARY RESTRICTIONS</p>
                                            {(userData) &&
                                                <div>
                                                    {(userData.group) ?
                                                        <div>
                                                            <p className='subsection-info-small'>CHECK THE BOX OF ANYONE WITH DIETARY RESTRICTIONS</p>
                                                            <GroupDiet setDietaryRestrictionsUsers={setDietaryRestrictionsUsers} dietaryRestrictionsUsers={dietaryRestrictionsUsers} addDietaryRestrictionsUsers={addDietaryRestrictionsUsers} removeDietaryRestrictionsUsers={removeDietaryRestrictionsUsers} userData={userData}></GroupDiet>
                                                        </div>  :
                                                        <div>
                                                            <p className='subsection-info-small'>CHECK THE BOX IF YOU HAVE ANY DIETARY RESTRICTIONS</p>
                                                            <div className='input-name-container'>
                                                                <div className='name-checkbox-container-single'>
                                                                    <div className='name-aligner'>
                                                                        <p>{userData.firstName} {userData.lastName}</p>
                                                                    </div>
                                                                    <div className='checkbox-conatiner'>
                                                                        <CheckBox addConfirmedUser={addDietaryRestrictionsUsers} removeConfirmedUser={removeDietaryRestrictionsUsers} userid={userData._id}></CheckBox>
                                                                        
                                                                    </div>
                                                                </div>
                                                                {(userData._id in dietaryRestrictionsUsers) &&
                                                                            <div>
                                                                                <DietaryRestrictionsInput userId={userData._id} dietaryRestrictionsUsers={dietaryRestrictionsUsers} setDietaryRestrictionsUsers={setDietaryRestrictionsUsers}></DietaryRestrictionsInput>
                                                                            </div>
                                                                }
                                                            </div>
                                                            
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className='subsection' id='song-subsection'>
                                            <p id='song-select-section-title' className='subsection-title'>WANT TO HEAR A SONG? SO DO WE! SUGGEST SOME...</p>
                                            <p className='subsection-info-small'>TAP A SELECTED SONG TO REMOVE</p>
                                            <SelectedSongsDisplay selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs}></SelectedSongsDisplay>
                                            {(userData.group) ? 
                                                <div>
                                                    {(Object.keys(selectedSongs).length != userData.group.members.length * 2) ?
                                                        <p id='selected-count-text'>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {userData.group.members.length * 2}</p>:
                                                        <p id='selected-count-text' style={{color:"red"}}>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {userData.group.members.length * 2}</p>
                                                    }
                                                </div>:
                                                <div>
                                                    {(Object.keys(selectedSongs).length != 2) ?
                                                        <p id='selected-count-text'>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of 2</p>:
                                                        <p id='selected-count-text' style={{color:"red"}}>SELECTED SONG COUNT: {Object.keys(selectedSongs).length} of {2}</p>
                                                    }
                                                </div>
                                            }
                                            
                                            {(userData.group) ? 
                                                <>
                                                    <p id='search-song-title'>SEARCH FOR A SONG</p>
                                                    <input type="text" className="input-box-song-search" value={songSearch} onChange={handleSearchChange} onFocus={onFocus} onBlur={toggleListVisibility}></input>
                                                    <div id='search-results-container' style={isListVisible()}>
                                                        {searchResults &&
                                                        searchResults.map((item) => {
                                                            return(
                                                                <SongDisplay item={item} key={item.id} setSongSearch={setSongSearch} isListVisible={isListVisible} setSelectedSongs={setSelectedSongs} maxAmount={userData.group.members.length * 2} selectedSongs={selectedSongs}></SongDisplay>
                                                            )
                                                        })

                                                        }
                                                    </div>
                                                </>:
                                                <>
                                                    <p id='search-song-title'>SEARCH FOR A SONG</p>
                                                    <input type="text" className="input-box-song-search" value={songSearch} onChange={handleSearchChange} onFocus={onFocus} onBlur={toggleListVisibility}></input>
                                                    <div id='search-results-container' style={isListVisible()}>
                                                        {searchResults &&
                                                        searchResults.map((item) => {
                                                            return(
                                                                <SongDisplay item={item} key={item.id} setSongSearch={setSongSearch} isListVisible={isListVisible} setSelectedSongs={setSelectedSongs} maxAmount={2} selectedSongs={selectedSongs}></SongDisplay>
                                                            )
                                                        })

                                                        }
                                                    </div>
                                                </>
                                            }
                                            
                                            
                                        </div>
                                        <div className='submit-button-section'>
                                            {

                                            }
                                            <button className='submit-button rsvp-submit' onClick={submitButtonClick}>SUBMIT</button>
                                        </div>
                                        
                                    </div>
                                    :
                                    <div className='already-submitted-container'>
                                        <div className='already-submitted-text-subcontainer'>
                                            <p className='already-submitted-container-title'>RSVP HAS BEEN SUBMITTED</p>
                                            <p className='already-submitted-container-subtitle'>TO MAKE ANY ADJUSTMENTS TO RSVP PLEASE REACH OUT TO NOAH OR ALE DIRECTLY</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        
                        <SubmitConfirmationPopup handleConfirmClick={handleSubmit} handleCancelClick={handleCancelClick} checkVisibility={checkVisibility}></SubmitConfirmationPopup>
                    </motion.div>
                )}
                
            </div>
        </div>
    )
}

export default Rsvp