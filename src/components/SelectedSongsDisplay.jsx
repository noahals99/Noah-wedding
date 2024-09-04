function SelectedSongsDisplay({selectedSongs, setSelectedSongs, setSelectedSongsId, selectedSongsId}){

    const handleCick = (song) => {
        let newList = selectedSongs.filter((item) => {
            return item.id != song.id
        })
        let newIdList = selectedSongsId.filter((item) => {
            return item != song.id
        })
        setSelectedSongs(newList);
        setSelectedSongsId(newIdList);
    }
    return(
        <div className="selected-songs-display">
            {selectedSongs.map((song) => {
                return(
                    <div className="selected-song-display-container" onClick={() => handleCick(song)} key={`selected${song.id}`}>
                        <img src={song.album.images[0].url} className="album-image"></img>
                        <div className="song-text-info">
                            <p className="song-title">{song.name}</p>
                            <p className="song-artist"  >{song.artists[0].name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SelectedSongsDisplay