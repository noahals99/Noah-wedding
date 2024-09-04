import venueImg from '../../public/venueStock.jpeg'
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { languageContext } from './Root';
import { useEffect, useState,useContext } from 'react';
import BackButton from '../components/BackButton';
import WeddingPartyPicutre from '../components/WeddingPartyPicture';
import SelectedPartyMemberPopup from '../components/SelectedPartyMemberPopup';
import userData from '../slideshowData.json';
import Timeline from '../components/Timeline';

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


const container = {
    hiddin: { opacity: 0, y: 10},
    visible: {
        opacity: 1,
        y:0,
        transition: {
            delay:2,
            when: "beforeChildren",
            staggerChildren: 0.3
        }
    }
}

const containerBachelorette = {
    hiddin: { opacity: 0, y: 10},
    visible: {
        opacity: 1,
        y:0,
        transition: {
            delay:3.7,
            when: "beforeChildren",
            staggerChildren: 0.3
        }
    }
}

const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
};




function Info() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(null);
    const [popupIsClosing, setPopupIsClosing] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);


    const imgLinks = [
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/BLAKE.JPEG", name:"BLAKE", role: "MAIN"},
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/MATT.JPEG", name:"MATT", role: "GENERAL"},
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/ANDREW.JPEG", name:"ANDREW", role: "GENERAL"},
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/MICHAEL.JPEG", name:"MICHAEL", role: "GENERAL"},
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/THEO.JPEG", name:"THEO", role: "GENERAL"},
        {picture:"../profile.jpg", name:"HUNTER", role: "GENERAL"},
        
    ]

    const imgLinksBachelorette = [
        {picture:"../profile.jpg", name:"MELA", role: "MAIN"},
        {picture:"../profile.jpg", name:"BRIANA", role: "GENERAL"},
        {picture:"../profile.jpg", name:"KATIE", role: "GENERAL"},
        {picture:"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/VICTORIA.JPEG", name:"VICTORIA", role: "GENERAL"},
        {picture:"../profile.jpg", name:"TAYLOR", role: "GENERAL"},
        {picture:"../profile.jpg", name:"MOLLIE", role: "GENERAL"},
        {picture:"../profile.jpg", name:"ELIZABETH", role: "MAIN"},
    ]


    useEffect(()=> {
        toggleVisible(true);
    },[])

    useEffect(()=> {
        if(selectedUser){
            setIsPopupVisible(true);
        }
    },[selectedUser])

    const toggleVisibility = () => {
        if(isPopupVisible === true){
            setIsPopupVisible(false);
            setTimeout(() => {
                setSelectedUser(null);
            },140)
            
        }
    }

    const getNoScroll = () => {
        if(isPopupVisible === true){
            return {"overflow": "hidden"}
        }else{
            return {"overflowY": "auto", "overflowX": "hidden"}
        }
    }


    return(
        
        <div className='app-background-color noselect' style={getNoScroll()}>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/coverphoto1.JPEG"} id='venue-img' style={{objectPosition: `70% ${(50+(0.2*((width/1488)*100))).toString()}%`}}></img>
                
                {language === 'ENGLISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>INFORMATION</motion.p>
                )}
                {language === 'SPANISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>INFORMACIÓN</motion.p>
                )}
                <motion.div className='page-title-shadow'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}></motion.div>
            </motion.div>
            <div id='info-section'>

                {language === 'ENGLISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        
                        
                        <div className='subsection info-section'>
                            <p className='subsection-title'>DATE</p>
                            <p className='subsection-info'>JUNE 27, 2025</p>
                        </div>
                        <div className='subsection info-section'>
                            <p className='subsection-title'>LOCATION</p>
                            <a className='subsection-info' id='address-links' target="_blank" href={"https://www.google.com/maps/place/Evergreen+Meadows+Venue/@47.5525436,-121.8125228,15z/data=!4m2!3m1!1s0x0:0xa3406adafb132675?sa=X&ved=1t:2428&ictx=111&cshid=1721239427733555"}>5510 396TH DR SE, SNOQUALMIE, WA 98065</a>
                        </div>
                        <div className='subsection-wedding-party'>
                            <p className='subsection-title'>WEDDING PARTY</p>
                            <p className='subsection-info-small'>CLICK ON PICTURES FOR MORE INFORMATION</p>
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className='image-list-container'
                            >
                                {imgLinks.map((data, index) => {

                                    return(
                                        <motion.li key={index}   variants={item} className='image-list-item'>
                                            <WeddingPartyPicutre popupIsClosing={popupIsClosing} toggleVisibility={toggleVisibility} userData={userData} setSelectedUser={setSelectedUser} pictureLink={data.picture} name={data.name} role={data.role}></WeddingPartyPicutre>
                                        </motion.li>
                                    )
                                })}
                            </motion.ul>
                            <motion.ul
                                variants={containerBachelorette}
                                initial="hidden"
                                animate="visible"
                                className='image-list-container'
                            >
                                {imgLinksBachelorette.map((data, index) => {

                                    return(
                                        <motion.li key={index}   variants={item} className='image-list-item'>
                                            <WeddingPartyPicutre popupIsClosing={popupIsClosing} toggleVisibility={toggleVisibility} userData={userData} setSelectedUser={setSelectedUser} pictureLink={data.picture} name={data.name} role={data.role}></WeddingPartyPicutre>
                                        </motion.li>
                                    )
                                })}
                            </motion.ul>
                        </div>
                        <div className='timeline-subsection'>
                            <p className='subsection-title timeline-title'>TIMELINE</p>
                            <Timeline language={language}></Timeline>
                        </div>
                        
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container' variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        
                        
                    <div className='subsection info-section'>
                        <p className='subsection-title'>DATE</p>
                        <p className='subsection-info'>JUNE 27, 2025</p>
                    </div>
                    <div className='subsection info-section'>
                        <p className='subsection-title'>LOCATION</p>
                        <a className='subsection-info' id='address-links' target="_blank" href={"https://www.google.com/maps/place/Evergreen+Meadows+Venue/@47.5525436,-121.8125228,15z/data=!4m2!3m1!1s0x0:0xa3406adafb132675?sa=X&ved=1t:2428&ictx=111&cshid=1721239427733555"}>5510 396TH DR SE, SNOQUALMIE, WA 98065</a>
                    </div>
                    <div className='subsection-wedding-party'>
                        <p className='subsection-title'>WEDDING PARTY</p>
                        <p className='subsection-info-small'>CLICK ON PICTURES FOR MORE INFORMATION</p>
                        <motion.ul
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className='image-list-container'
                        >
                            {imgLinks.map((data, index) => {

                                return(
                                    <motion.li key={index}   variants={item} className='image-list-item'>
                                        <WeddingPartyPicutre popupIsClosing={popupIsClosing} toggleVisibility={toggleVisibility} userData={userData} setSelectedUser={setSelectedUser} pictureLink={data.picture} name={data.name} role={data.role}></WeddingPartyPicutre>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                        <motion.ul
                            variants={containerBachelorette}
                            initial="hidden"
                            animate="visible"
                            className='image-list-container'
                        >
                            {imgLinksBachelorette.map((data, index) => {

                                return(
                                    <motion.li key={index}   variants={item} className='image-list-item'>
                                        <WeddingPartyPicutre popupIsClosing={popupIsClosing} toggleVisibility={toggleVisibility} userData={userData} setSelectedUser={setSelectedUser} pictureLink={data.picture} name={data.name} role={data.role}></WeddingPartyPicutre>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </div>
                    <div className='timeline-subsection'>
                        <p className='subsection-title timeline-title'>TIMELINE</p>
                        <Timeline language={language}></Timeline>
                    </div>
                    
                </motion.div>
                )}
                
            </div>
            
            <SelectedPartyMemberPopup language={language} popupIsClosing={popupIsClosing} setPopupIsClosing={setPopupIsClosing} isPopupVisible={isPopupVisible} toggleVisibility={toggleVisibility} userData={selectedUser}></SelectedPartyMemberPopup>
        </div>
    )
}

export default Info