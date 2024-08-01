import { useEffect, useState } from "react"
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { wrap } from "popmotion";

const hideVariants = {
    visible: {
        visibility: "visible",
        transition: {
        }
    },
    notVisible: {
        visibility: "hidden",
        transition: {
            delay: 0.6,
        }
    }
}

const popupVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
        }
    },
    notVisible: {
        opacity: 0,
        transition: {
            delay: 0.4,
            duration: 0.5,
        }
    }
}

const popupVariantsMain = {
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
            opacity:{
                delay:0.05
            }
        }
    },
    notVisible: {
        scale: 0,
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}


const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };


const swipeConfidenceThreshold = 50;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity * 0.05;
};

function SelectedPartyMemberPopup({userData, toggleVisibility, isPopupVisible, popupIsClosing, setPopupIsClosing}){
    const [[page, direction], setPage] = useState([0, 0]);
    const [isDragging, setIsDragging] = useState("")
    let imageIndex = wrap(0, 0, page);
    
    if(userData){
        imageIndex = wrap(0, Object.keys(userData.slideshowImages).length, page);
    }else{
        imageIndex = wrap(0, 0, page);
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 6000);

        return () => clearInterval(interval);
    },[page])

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
      };

    const handleclick = (event) => {
        if(event.target.className === "party-member-popup-aligner"){
            toggleVisibility();
            setPopupIsClosing(true);
        }
    }

    const handleDragChange = (event) => {
        if(event.type === "mousedown"){
            setIsDragging("dragging")
        }else if(event.type === "mouseup"){
            setIsDragging("")
        }
        
    }

    return(
        <div>
            <motion.div variants={hideVariants} animate={isPopupVisible ? "visible" : "notVisible" } initial={false}>
                <motion.div variants={popupVariants} animate={isPopupVisible ? "visible" : "notVisible" } initial={false} className="party-member-popup-aligner" onMouseDown={handleclick}>
                    <motion.div  variants={popupVariantsMain} animate={isPopupVisible ? "visible" : "notVisible" } initial={false}  className="party-member-popup-container">
                        {(userData)&&
                            <div>
                                <div className="img-slideshow-container">
                                    <div id="img-background"></div>
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.img
                                            key={page}
                                            src={userData.slideshowImages[imageIndex].link}
                                            style={{objectPosition: `${userData.slideshowImages[imageIndex].xOffset}% ${userData.slideshowImages[imageIndex].yOffset}%`}}
                                            custom={direction}
                                            variants={variants}
                                            className={`popup-img ${isDragging}`}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 300, damping: 40 },
                                                opacity: { duration: 0.2 }
                                            }}
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.4}
                                            onMouseDown={handleDragChange}
                                            onMouseUp={handleDragChange}
                                            onDragEnd={(e, { offset, velocity }) => {
                                                const swipe = swipePower(offset.x, velocity.x);
                                                setIsDragging("")
                                                if (swipe < -swipeConfidenceThreshold) {
                                                    paginate(1);
                                                    
                                                } else if (swipe > swipeConfidenceThreshold) {
                                                    paginate(-1);
                                                }
                                            }}
                                        ></motion.img>
                                    </AnimatePresence>
                                    <div className="next" onClick={() => paginate(1)}>
                                        <p className="slideshow-arrow-text">{">"}</p>
                                    </div>
                                    <div className="prev" onClick={() => paginate(-1)}>
                                        <p className="slideshow-arrow-text-back">{"<"}</p>
                                    </div>
                                    <div className="close-popup-button" onClick={() => {
                                        toggleVisibility();
                                        setPopupIsClosing(true);
                                    }}>
                                        <p className="slideshow-close-text">x</p>
                                    </div>
                                </div>
                                <div className="slideshow-popup-text-container">
                                    <p className="popup-title">{userData.name}</p>
                                    <p className="popup-description">{userData.description}</p>
                                </div>
                                
                            </div>
                        }
                
                        
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
        
        
        
    )
}

export default SelectedPartyMemberPopup