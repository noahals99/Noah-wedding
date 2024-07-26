import { motion } from 'framer-motion';

function ConfirmationPopup({handleConfirmClick, checkVisibility, handleCancelClick}){
    return(
        <motion.div className="confirmation-page" initial={{opacity:0}} animate={{opacity:1}} style={checkVisibility()}>
            <motion.div className='confirmation-container'  initial={{scale:0}} animate={{scale:1, transition:{delay:0.5}}}>
                <p className='confirmation-title'>Are you sure you want to delete this user?</p>
                <div className='confirmation-buttton-container'>
                    <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
                    <button className='cancel-button' onClick={handleCancelClick}>Cancel</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ConfirmationPopup