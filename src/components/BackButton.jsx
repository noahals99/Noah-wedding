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


function BackButton({isVisible,toggleVisible}){
    const navigate = useNavigate();
    const handleClick = () => {
        toggleVisible();
        setTimeout(()=> {
            navigate("/");
        }, 2200)
        
    }
    return(
        <motion.div className='back-button' whileTap={{scale:0.99}} onClick={handleClick} variants={backVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
            <svg width="50" height="50" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_0_1)">
                <circle cx="18" cy="18" r="10" fill="white"/>
                </g>
                <path d="M16.7963 16L15.1844 17.4268C14.9445 17.6392 14.9372 18.1855 15.1713 18.4139L16.7963 20M15.0002 17.9084H21" stroke="black" strokeLinecap="round"/>
                <defs>
                <filter id="filter0_d_0_1" x="0.0999999" y="0.0999999" width="35.8" height="35.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="0.1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_0_1"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                </filter>
                </defs>
            </svg>
        </motion.div>
        
    )
}

export default BackButton