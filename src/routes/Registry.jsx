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
            delay:0.5
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
            delay:1
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
            delay:2
        }
    }
}

const ZolaRegistry = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.id = 'zola-wjs';
        script.async = true;
        script.src = 'https://widget.zola.com/js/widget.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <a 
            className="zola-registry-embed" 
            href="www.zola.com/registry/alsinaramirezwedding" 
            data-registry-key="alsinaramirezwedding"
        >
            Our Zola Wedding Registry
        </a>
    );
};



function Registry() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;


    return(
        
        <div className='app-background-color noselect'>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/soundBackgroundImage.JPEG"} onLoad={() => toggleVisible(true)} style={{objectPosition: '50% 60%'}} id='venue-img'></img>
                
                {language === 'ENGLISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>REGISTRY</motion.p>
                )}
                {language === 'SPANISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>REGISTRO</motion.p>
                )}
                <motion.div className='page-title-shadow'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}></motion.div>
            </motion.div>
            <div id='venue-info-section'>

                {language === 'ENGLISH' && (
                    <motion.div className='subsection-container registry-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div id='widget-container'>
                            <ZolaRegistry />
                        </div>
                        
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container registry-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div id='widget-container'>
                            <ZolaRegistry />
                        </div>
                        
                    </motion.div>
                )}
                
            </div>
        </div>
    )
}

export default Registry