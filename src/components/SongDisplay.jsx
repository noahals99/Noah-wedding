import { motion } from "framer-motion"

function SongDisplay({maxAmount, item, setSongSearch, isListVisible,selectedSongsId, setSelectedSongsId, setSelectedSongs, selectedSongs}) {
    const handleClick = (item) => {
        if((selectedSongs.indexOf(item) === -1) && (Object.keys(selectedSongs).length < maxAmount)){
            setSongSearch('')
            setSelectedSongs([...selectedSongs, item])
            setSelectedSongsId([...selectedSongsId, item.id])
        }
        
    }

    const isSelected = () => {
        if((selectedSongs.indexOf(item) === -1) && ((Object.keys(selectedSongs).length != maxAmount))){
            return "song-display-container"
        }else{
            return "song-display-container"
        }
    }
    
    return(
        <motion.div className={isSelected()} onClick={() => handleClick(item)} whileTap={{backgroundColor: "rgb(160, 160, 160)", transition:{duration:0.001}}}>
            <img src={item.album.images[0].url} className="album-image" style={isListVisible()}></img>
            <div className="song-text-info">
                <p className="song-title" style={isListVisible()}>{item.name}</p>
                <p className="song-artist" style={isListVisible()}>{item.artists[0].name}</p>
            </div>
            
        </motion.div>
    )
}

export default SongDisplay