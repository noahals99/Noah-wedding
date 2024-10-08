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




function Bachelorette() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;

    useEffect(()=> {
        toggleVisible(true);
    },[])

    return(
        
        <div className='app-background-color noselect'>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={venueImg} id='venue-img'></img>
                
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
                        <div className='subsection'>
                            <p className='subsection-title'>NAME</p>
                            <p className='subsection-info'>CHATEAU LILL</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>ADDRESS</p>
                            <p className='subsection-info'>14208 REDMOND - WOODINVILLE RD NE, REDMOND, WA 98052</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>CEREMONY</p>
                            <p className='subsection-info'>CHATEAU LAWN</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>RECEPTION</p>
                            <p className='subsection-info'>CHATEAU TENT</p>
                        </div>
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div className='subsection'>
                            <p className='subsection-title'>NOMBRE</p>
                            <p className='subsection-info'>CHATEAU LILL</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>DIRECCIÓN</p>
                            <p className='subsection-info'>14208 REDMOND - WOODINVILLE RD NE, REDMOND, WA 98052</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>CEREMONIA</p>
                            <p className='subsection-info'>CHATEAU LAWN</p>
                        </div>
                        <div className='subsection'>
                            <p className='subsection-title'>RECEPCIÓN</p>
                            <p className='subsection-info'>CHATEAU TENT</p>
                        </div>
                    </motion.div>
                )}
                
            </div>
        </div>
    )
}

export default Bachelorette