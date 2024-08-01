import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { apiUrlStart } from "./Root";
import { useNavigate } from 'react-router-dom';


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

function AdminSongRequests({}) {
    const [songData, setSongData] = useState(null);

    useEffect(()=> {
        let apiUrl = `${apiUrlStart}/getSongRequests`;
        axios({
            method: "GET",
            url: apiUrl,
            headers: { 
              'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`, 
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((response) => {
                setSongData(response.data)
            })
            .catch((error) => {
              console.log(error);
            })
    },[]);

    return(
        <div className='app-background-color'>
            <BackButtonRsvp />
            <div id="user-cards-container">
            {(songData) &&
                <div id='rsvp-admin-container'>
                    <div id='admin-rsvp-grid'>
                        <div id='admin-rsvp-row-container'>
                            <div id='admin-rsvp-title-row' className='admin-rsvp-row'>
                                <div className='admin-rsvp-cell'>
                                    <p>Title</p>
                                </div>
                                <div className='admin-rsvp-cell'>
                                    <p className='admin-rsvp-column'>Artist</p>
                                </div>
                                <div className='admin-rsvp-cell'>
                                    <p>Song</p>
                                </div>
                            </div>
                        </div>
                        {songData.map((song) => {
                            return (
                                <div className='admin-rsvp-row' key={song._id}>
                                    <div className='admin-rsvp-cell'>
                                        <p>{song.name}</p>
                                    </div>
                                    <div className='admin-rsvp-cell'>
                                        <p>{song.artist}</p>
                                    </div>
                                    <div className='admin-rsvp-cell'>
                                        <p>{song.album}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                    
            }
            </div>
        </div>
    )
}

export default AdminSongRequests