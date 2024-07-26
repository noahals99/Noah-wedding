import { useEffect, useState } from "react"
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { wrap } from "popmotion";


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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function LodgingCard({item}) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isDragging, setIsDragging] = useState("")
    const imageIndex = wrap(0, item.pictures.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleDragChange = (event) => {
        if(event.type === "mousedown"){
            setIsDragging("dragging")
        }else if(event.type === "mouseup"){
            setIsDragging("")
        }
        
    }

    return(
        <div className="lodging-card-container">
            <div className="lodging-card-info-container">
                <div className="lodging-title-container">
                    <p className="lodging-card-title">{item.name}</p>
                    <p className="lodging-card-address">{item.address}</p>
                    <p className="lodging-card-distance">{item.distance} from venue</p>
                    <a className='subsection-info lodging-card-website' id='address-links' target="_blank" href={item.link}>WEBSITE</a>
                </div>
                <div className="lodging-img-container">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={`${item.name}${page}`}
                            src={item.pictures[imageIndex]}
                            custom={direction}
                            variants={variants}
                            className={`lodging-img ${isDragging}`}
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
                    <div className="next-lodge" onClick={() => paginate(1)}>
                        <p className="slideshow-arrow-text">{">"}</p>
                    </div>
                    <div className="prev-lodge" onClick={() => paginate(-1)}>
                        <p className="slideshow-arrow-text-back">{"<"}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default LodgingCard