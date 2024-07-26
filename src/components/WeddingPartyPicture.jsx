import {motion,useCycle,AnimatePresence} from 'framer-motion'



const outlineGeneral = {
    backgroundColor: "#bbdf8c"
}

const outlineMain = {
    backgroundColor: "#ffe48c"
}


function WeddingPartyPicutre({userData, pictureLink, name, role, setSelectedUser, toggleVisibility}){

    const getStyle = () => {
        if(role === "GENERAL"){
            return outlineGeneral
        }else{
            return outlineMain
        }
    }

    const handleClick = () => {
        if(userData[name]){
            toggleVisibility();
            setSelectedUser(userData[name]);
        }
        
    }

    return(
        <div className='wedding-party-img-container'>
            <motion.div className='outline' style={getStyle()} onClick={handleClick} whileTap={{scale:0.9}}>
                <motion.img src={pictureLink} className="wedding-party-image"></motion.img>
            </motion.div>
            <p className='wedding-party-img-title'>{name}</p>
        </div>
        
    )
}

export default WeddingPartyPicutre