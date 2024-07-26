import { useNavigate } from "react-router-dom";
import {motion,useCycle,AnimatePresence} from 'framer-motion'

const backVariants = {
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


function GroupsButton({isVisible,toggleVisible}){
    const navigate = useNavigate();
    const handleClick = () => {
        toggleVisible();
        setTimeout(()=> {
            navigate("/admin-setup/groups");
        }, 2200)
        
    }
    return(
        <motion.div className='groups-button' whileTap={{scale:0.99}} onClick={handleClick} variants={backVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
            <svg width="84" height="65" viewBox="0 0 54 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_41_5)">
            <rect x="8.60074" y="8.51974" width="36.7985" height="18.4258" rx="9.21291" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_d_41_5" x="0.700738" y="0.619745" width="52.5985" height="34.2258" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_41_5"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.95"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_41_5"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_41_5" result="shape"/>
            </filter>
            </defs>
            </svg>
            <p className="groups-button-title">GROUPS</p>
        </motion.div>
        
    )
}

export default GroupsButton