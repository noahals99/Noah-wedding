import {motion} from 'framer-motion'

const timelineData = [
    {
        time: "4:00 PM",
        description: "GUESTS ARRIVE",
        descriptionSpanish: "LLEGAN INVITADOS",
    },
    {
        time: "4:30 PM",
        description: "CEREMONY BEGINS",
        descriptionSpanish: "COMIENZA LA CEREMONIA",
    },
    {
        time: "5:00 PM",
        description: "COCKTAIL HOUR",
        descriptionSpanish: "HORA DEL CÓCTEL",
    },
    {
        time: "6:00 PM",
        description: "RECEPTION BEGINS",
        descriptionSpanish: "COMIENZA LA RECEPCIÓN",
    },
    {
        time: "6:10 PM",
        description: "GRAND ENTRANCE",
        descriptionSpanish: "GRAN ENTRADA",
    },
    {
        time: "6:15 PM",
        description: "DINNER SERVICE BEGINS",
        descriptionSpanish: "COMIENZA EL SERVICIO DE CENA",
    },
    {
        time: "6:45 PM",
        description: "TOASTS",
        descriptionSpanish: "EL BRINDIS",
    },
    {
        time: "7:00 PM",
        description: "CAKE CUTTING",
        descriptionSpanish: "CORTE DE PASTEL",
    },
    {
        time: "7:15 PM",
        description: "FIRST DANCE",
        descriptionSpanish: "PRIMER BAILE",
    },
    {
        time: "7:20 PM",
        description: "DANCE",
        descriptionSpanish: "BAILAR",
    },
    {
        time: "9:00 PM",
        description: "SEND OFF",
        descriptionSpanish: "ENVIAR",
    },
    {
        time: "10:00 PM",
        description: "AFTER PARTY",
        descriptionSpanish: "DESPUÉS DE LA FIESTA",
    }
]

const cardVariants = {
    offscreen: {
      opacity: 0
    },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay:0.3
      }
    }
  };

function Timeline({language}) { 


    return(
        <motion.div
            className="timeline-aligner"
            initial={{opacity:0}}
            animate={{
                opacity:1,
                transition:{
                    delay: 3,
                    duration: 1.1
                }
            }}
        >
            <motion.div
                className="timeline-container"
                initial={{opacity:0}}
                animate={{
                    opacity:1,
                    transition:{
                        delayChildren: 3.2,
                        staggerChildren: 1
                    }
                }}
            >
                {timelineData.map((item, index) => {
                    return(
                        <motion.div
                            className="timeline-item" key={`timeline${index}`}
                            initial="offscreen"
                            whileInView="onscreen"
                            variants={cardVariants}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div>
                                <p>{item.time}</p>
                                <p>{item.description}</p>
                            </div>
                            {(index !== timelineData.length-1) &&
                                <div className="timeline-seperator"></div>
                            }
                            
                        </motion.div>
                    )
                })

                }
            </motion.div>
        </motion.div>
        
    )
}


export default Timeline