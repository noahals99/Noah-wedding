function SongDisplay({maxAmount, item, setSongSearch, isListVisible, setSelectedSongs, selectedSongs}) {
    const handleClick = (item) => {
        if((selectedSongs.indexOf(item) === -1) && (Object.keys(selectedSongs).length < maxAmount)){
            setSongSearch('')
            setSelectedSongs([...selectedSongs, item])
        }
        
    }

    const isSelected = () => {
        if((selectedSongs.indexOf(item) === -1) && ((Object.keys(selectedSongs).length != maxAmount))){
            return "song-display-container"
        }else{
            return "song-display-container-selected"
        }
    }
    
    return(
        <div className={isSelected()} onClick={() => handleClick(item)}>
            <img src={item.album.images[0].url} className="album-image" style={isListVisible()}></img>
            <div className="song-text-info">
                <p className="song-title" style={isListVisible()}>{item.name}</p>
                <p className="song-artist" style={isListVisible()}>{item.artists[0].name}</p>
            </div>
            
        </div>
    )
}

export default SongDisplay