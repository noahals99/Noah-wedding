import venueImg from '../../public/venueStock.jpeg'
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { languageContext } from './Root';
import { useEffect, useState,useContext } from 'react';
import BackButton from '../components/BackButton';

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




function Venue() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;

    useEffect(()=> {
        toggleVisible(true);
    },[])

    return(
        
        <div className='app-background-color noselect'>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/venue.jpg"} id='venue-img' style={{objectPosition: '70% 70%'}}></img>
                
                {language === 'ENGLISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>VENUE</motion.p>
                )}
                {language === 'SPANISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>EVENTO</motion.p>
                )}
                <motion.div className='page-title-shadow'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}></motion.div>
            </motion.div>
            <div id='venue-info-section'>

                {language === 'ENGLISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>NAME</p>
                            <p className='subsection-info'>EVERGREEN MEADOWS</p>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>ADDRESS</p>
                            <a className='subsection-info' id='address-links' target="_blank" href={"https://www.google.com/maps/place/Evergreen+Meadows+Venue/@47.5525436,-121.8125228,15z/data=!4m2!3m1!1s0x0:0xa3406adafb132675?sa=X&ved=1t:2428&ictx=111&cshid=1721239427733555"}>5510 396TH DR SE, SNOQUALMIE, WA 98065</a>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>CEREMONY</p>
                            <p className='subsection-info'>MEADOW LAWN</p>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>RECEPTION</p>
                            <p className='subsection-info'>MEADOW TENT</p>
                        </div>
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>NAME</p>
                            <p className='subsection-info'>EVERGREEN MEADOWS</p>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>ADDRESS</p>
                            <a className='subsection-info' id='address-links' target="_blank" href={"https://www.google.com/maps/place/Evergreen+Meadows+Venue/@47.5525436,-121.8125228,15z/data=!4m2!3m1!1s0x0:0xa3406adafb132675?sa=X&ved=1t:2428&ictx=111&cshid=1721239427733555"}>5510 396TH DR SE, SNOQUALMIE, WA 98065</a>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>CEREMONY</p>
                            <p className='subsection-info'>MEADOW LAWN</p>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>RECEPTION</p>
                            <p className='subsection-info'>MEADOW TENT</p>
                        </div>
                    </motion.div>
                )}
                
            </div>
        </div>
    )
}

export default Venue