import venueImg from '../../public/venueStock.jpeg'
import {motion,useCycle,AnimatePresence} from 'framer-motion'
import { languageContext } from './Root';
import { useEffect, useState,useContext } from 'react';
import BackButton from '../components/BackButton';
import LodgingCard from '../components/LodgingCard';




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



function Lodging() {
    const [isVisible, toggleVisible] = useState(false);
    const language = useContext(languageContext).language;
    const lodgingData = [
        {
            name: "Snoqualmie Inn",
            address: "35228 Snoqualmie Pkwy, Snoqualmie, WA 98065",
            link: "https://www.thehotelamerica.com/",
            pictures: [
                "https://lh5.googleusercontent.com/p/AF1QipO_-PyL-oYIXRPriumhEh3RVMHPZYRiPCBGMhDs=w252-h170-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipO0uFEmsUDCTOnjaH3IBHjoNlbO57eD1aNpETeW=k-no",
                "https://photos.hotelbeds.com/giata/original/67/672310/672310a_hb_w_018.jpg",
                "https://lh3.googleusercontent.com/proxy/IVMHFIW7cfeQPJhZr_-p2jeqV4KwarD9uR4w1DykNeAlATL8TtOcdZ95ujW1Bu5vBnXOLY6P5SMIY7RQCdKibyCJCSRsoox5E6uq5vgjqyV2UmMo_u2H7kkGywIz9N3qa6SRgbWvvBDwt9w2_UMXB8lKy8YFAHc=w252-h167-k-no",
                "https://photos.hotelbeds.com/giata/original/67/672310/672310a_hb_f_001.jpg",
                "https://lh5.googleusercontent.com/p/AF1QipOd74so-hvwxj2dgLwb8st8z-zLb2qlgn40q1qF=k-no",
                "https://lh5.googleusercontent.com/proxy/ReDS-4fFgosdgRxoPq3Oa62PsVMw5wElhfAXFncu5ZxkDojrHkwfDNxENVQ6F_NAsFHCYZcLqMFjXJXxy6E3y0vT6rugaEATiaWY4xnk_1CSNibsGf6F2bnfcCvNuJP4k57cBggL-N-JTL5HJrtCouUdxJUgvg=w253-h168-k-no",
                
            ],
            distance: "8 min"
        },
        {
            name: "Salish Lodge & Spa",
            address: "6501 Railroad Ave, Snoqualmie, WA 98065",
            link: "https://www.salishlodge.com/",
            pictures: [
                "https://lh5.googleusercontent.com/p/AF1QipNkD9C7THfd5phcyxgNCfyQIGpmfN7jZb13mqMA=w253-h189-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPNSjPcKn3NPWDdsgZitYIhrj2IUojlst_8QwJH=w253-h189-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPA14IM_N8xig0d773Go2xdb3gu8RsViEqH9qAC=k-no",
                "https://lh5.googleusercontent.com/p/AF1QipN_OSk_Tr5s8DMXPkopjhwZndT7A6r5ASzYFdXz=w253-h337-k-no",
                "https://lh5.googleusercontent.com/proxy/Oef1b08Eh-VvvGYmG1pG2hRezMV4P_TmWNnHI4Fda2jvsIQ-QCBJ0Ez49Aok9Bby5-285LAokuh4FSAXQ2zSRy3NC82vwCnOmyMfeRPcp665lMS8S18uGICBMG0pZaNkPOgwSANpNjG67Gnfg6AwAjU3LvJ5KGs=w253-h337-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOzq9J3E10_ooavl_CSpTzbAhrgrNP69UEJFiYm=w253-h168-k-no",
                
            ],
            distance: "4 min"
        },
        {
            name: "Roaring River Bed & Breakfast",
            address: "46715 SE 129th St, North Bend, WA 98045",
            link: "https://www.theroaringriver.com/",
            pictures: [
                "https://lh3.googleusercontent.com/proxy/jUcauPVbUTcRiqCHywVX1f8TU-NtxqEA8Yens8c-GyA8qQ32WKQpYksemkNqu5czfJT4bdC0wDNuJyG5eJFrtcbtPOKmFB2sMi6ko8O5UWCkTA0cItS7MwxwmIdOfKG1OHofp5Do53EkKRo7EREEjo_hmnu-AFA=w253-h170-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipN4pJPf3GP-kOGGhY9aJpHZYbbxSYCPMJM8b0fX=k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNVpHyGoNytsytt6gYyyvG5FIGlc6UVLYGImHGQ=w253-h336-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOsBLE4bzlXXh4Aw9Sh9nUkqTwldVXFRuAT1xbH=w253-h337-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMhbjnlJuxOxZdhcnef1Kf4ZzTPwrNB1cgkmKL9=w253-h337-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOR7UI15nbcNhVNr8HFXoWXldLejEIBMt1-NgIZ=k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPuZVYmlzE2_m9t4RKyWRoRIw51S3Rbk8iiAOKP=k-no",
            ],
            distance: "19 min"
        },
        {
            name: "The Roadhouse Inn",
            address: "4200 Preston-Fall City Rd SE, Fall City, WA 98024",
            link: "https://fcroadhouse.com/",
            pictures: [
                "https://lh5.googleusercontent.com/proxy/SnHxmyO0gLp-oLY6Y-BA9RK_2y8tPNnVEMVM0lnS-EJ9mWL4sDUedlEuC1D3BuxxSXOf_i1082T2O3U3qWOH445-I3-7f24s7NPAZQRg_oLKBA3dtueu2lSG4ppRvtsKMe7-o7bmpsz_lvFRAwWMYKGsPdCjJg=w253-h168-k-no",
                "https://lh5.googleusercontent.com/proxy/gpxMSsTIvO5O8fJ6VVCMM3apsY6NnaGzaEHLmo5AkgR66Cb-fgF7jfQUOs1njQgv7n-gmM9O-JDrO-RnTL0n8P3GC0j3VPoXP8qND3jMx7UdtbUsXEivo5y7cg4UJIBmkwmZKFQ_ILuU9EXlQpegQbWDQtYWX3Q=w253-h186-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPQIrSdxDFuZ2d0u5rQZP_2lsdBRBEluTAoKW3A=w253-h189-k-no",            
            ],
            distance: "11 min"
        },
        {
            name: "Hilton Garden Inn Seattle/Issaquah",
            address: "1800 NW Gilman Blvd, Issaquah, WA 98027",
            link: "https://www.hilton.com/en/hotels/seaisgi-hilton-garden-inn-seattle-issaquah/?SEO_id=GMB-AMER-GI-SEAISGI&y_source=1_MjA4MjcxMi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
            pictures: [
                "https://lh5.googleusercontent.com/p/AF1QipPgFtc9kw1aPruxJjnS_siMIE6MSwltnwNA3rg=w253-h168-k-no",
                "https://cdn.ostrovok.ru/t/1024x768/mec/df/48/df48f74851a84330dc2f055ed1790a4e24d76a98.jpeg",
                "https://lh5.googleusercontent.com/p/AF1QipPCrMa4pWBlYpPLf08ll5Wq0KhZHK_kZFLwdRI=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMtzZWZhwm10gigO60ja6_O87PhVwawjVvo7IU=k-no",
                "https://lh5.googleusercontent.com/p/AF1QipN7kzLSVUEjsuSbv1lbIK79TFBcDDf0XyrduVZW=w253-h337-k-no",
                "https://lh3.googleusercontent.com/proxy/cErWmKqEhMoI9YgaQqdU9SEJx6_CLnkypJVzC-_dcOyAFzHmR_jGDLJl8qyJX2N20x32tFLzieklPj1K1YFgI1GF2GcOXMbXooI4Vc8Qyg1feUShj1MwXZGcFTwNBaGvrv8sFZxZVoPB_QStWLh4CfQ_imfWug=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipPby9oJGW2V2UVNWPO5U_0n4gQg5fXlH36E2t4P=w253-h189-k-no",
                
            ],
            distance: "22 min"
        },
        {
            name: "Homewood Suites by Hilton Seattle-Issaquah",
            address: "1484 Hyla Ave NW, Issaquah, WA 98027",
            link: "https://www.hilton.com/en/hotels/seaiqhw-homewood-suites-seattle-issaquah/?SEO_id=GMB-AMER-HW-SEAIQHW&y_source=1_MjQ5NzY2MC03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
            pictures: [
                "https://lh3.googleusercontent.com/p/AF1QipNR7GUgc_FVxWFaFTlH10CuwanHUUm1lyyuBG8Q=w574-h384-n-k-rw-no-v1",
                "https://lh5.googleusercontent.com/p/AF1QipNLTsEYNv-Z3yNwglZ9_XsDE1hlmJOdxzTekv03=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOpIKDecgn5smg50EwzCY8J6CodZ2pQt-Ou9n3I=k-no",
                "https://lh5.googleusercontent.com/proxy/f87lKvOgE7tNIOkZioANamdgrncPitxHP1TCxnfuPVTxtsfTtbJgcbec62ZjcjjZkRv3MbAfYxh16NRGO1BbbTNsVor-YfOguR20Yq0ejmsyutijObrmEGyjnLHO0UqEbYN9qR1p3ICaASAaBT1Gz3S1d6wLmuE=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNrzv2cAzyDuRUPl1dYbHoK2QfFQbrBtkbywArG=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMm7b0AzShK1CSMwFnC6gSYO9ibxQbpAuRLEswy=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMMWkw2WqHI9AL6xvvaUe9yNcgCrcaRL89a-mmA=w253-h168-k-no",
            ],
            distance: "22 min"
        },
        {
            name: "SpringHill Suites Seattle Issaquah",
            address: "1185 NW Maple St, Issaquah, WA 98027",
            link: "https://www.marriott.com/en-us/hotels/seaxs-springhill-suites-seattle-issaquah/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
            pictures: [
                "https://lh5.googleusercontent.com/p/AF1QipOjSyIs54WbrvKxcVk39EUGNMhgtthjbdm2BEEx=w253-h189-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOjVeGBWYPalLwaIt8rpPi0g6WNnlD98Ptl19AN=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipO_PKCgB9bxICnXuXTphBBcxH6aUdkPKk9xgk-1=k-no",
                "https://lh5.googleusercontent.com/p/AF1QipP_dO_qmqI0SpKuWUP7h-etuCGIJ13kwf_gY9yb=w253-h189-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipOF5Nk4PaWFKKCZG0NpLmEmKrQ0irfl0l5-_xJC=w253-h142-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipNYem9eWNy52CCE4T91d3nYQFwe2XO81CxbFRhy=w253-h168-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMcRxSYqp-F1j7sbGNiWzlrs5urizvFn0ibV4X9=w253-h189-k-no",
            ],
            distance: "22 min"
        },
        {
            name: "Hampton Inn & Suites Seattle/Redmond",
            address: "17770 NE 78th Pl, Redmond, WA 98052",
            link: "https://www.hilton.com/en/hotels/searehx-hampton-suites-seattle-redmond/?SEO_id=GMB-AMER-HX-SEAREHX&y_source=1_NjAxNzY3NS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
            pictures: [
                "https://lh4.googleusercontent.com/proxy/Ywgh62PKodovPrS8kFRT0_KUjK8B7Zg2BnthKLMYptPMLyoKhp1t72kxy7z_dPPb_ukXprwWLhJBXE70uOhLakdnDyz8HEZ_ajmuLFq_s3IhqSss6xrBiuPbz_VyL1PYst4t4_9XxQ7ANM7m6WDjBuTylg-fkQ=w253-h157-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMJ97KwhIu6f6K08W2xsLM5hBgcnhkyS1Lef4-d=k-no",
                "https://i.giatamedia.com/m.php?m=AQABAAAAla4KACRVWwQFAKJlAzSvZmYKB3QZaSjhIl4",
                "https://d2hyz2bfif3cr8.cloudfront.net/imageRepo/7/0/154/307/649/74332344_4K_O.jpg",
                "https://lh5.googleusercontent.com/p/AF1QipOdOkUBfXgf6NLduNbvaz6NOVBmWNIHRvFak_Gd=w253-h337-k-no",
                "https://lh4.googleusercontent.com/proxy/oXlJVyQMjqRAAR3pKPlW-VoJsyKXeLJukGc-ux-f6gAUduIVkBJxzAppMHHwzaBDfgRot0een1ERwAs9DFiDSeAiSgaPy0-W_LcvkI3gB-XC28cbfuR6qBuJqYNegNhumwKw0SsSWmB1J-SfKbKHvzuxoQ9Svg=w253-h167-k-no",
                "https://lh5.googleusercontent.com/proxy/bnEggu1AxMjkvOJu4P7UQFEdK2qDmnmeiBhQp-ZGrQh22_FBdvggBfhGzTFq57nwQPvuHWucgKpdWX0IPj8jP4tFiH3vPrUtZRw5Xtt_668e9hNyElRTqC6lVYFgZwymeO4d9Jwg2kuQj4jjmKYEMBJXZmJI910=w253-h161-k-no",
            ],
            distance: "32 min"
        },
    ]


    return(
        
        <div className='app-background-color noselect'>
            <BackButton isVisible={isVisible} toggleVisible={toggleVisible}/>
            <motion.div id="Venue-container"  variants={imgVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                <img src={"https://weddingwebsiteimages.s3.us-west-2.amazonaws.com/beachBackgroundImage.JPEG"} onLoad={() => toggleVisible(true)} id='venue-img'></img>
                
                {language === 'ENGLISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>LODGING</motion.p>
                )}
                {language === 'SPANISH' && (
                    <motion.p className='page-title'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>ESTADIA</motion.p>
                )}
                <motion.div className='page-title-shadow'  variants={titleVariants} animate={isVisible ? "visible" : "invisible" } initial={false}></motion.div>
            </motion.div>
            <div id='venue-info-section'>

                {language === 'ENGLISH' && (
                    <motion.div className='subsection-container lodging-page'variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div className='subsection-lodging-container'>
                            <p className='subsection-title lodging-title'>LODGING UNDER 35MIN FROM VENUE</p>
                            <div
                                className='lodging-subsection'
                                
                            >
                                
                                
                                {lodgingData.map((item) => {
                                    return(
                                        <div key={`lodging${item.name}English`}>
                                            
                                            <LodgingCard item={item}></LodgingCard>
                                        </div>
                                        
                                    ) 
                                })
                                }
                            </div>
                        </div>
                    </motion.div>
                )}
                {language === 'SPANISH' && (
                    <motion.div className='subsection-container lodging-page'variants={infoVariants} animate={isVisible ? "visible" : "invisible" } initial={false}>
                        <div className='subsection-lodging-container'>
                            <p className='subsection-title lodging-title'>LODGING UNDER 35MIN FROM VENUE</p>
                            <div
                                className='lodging-subsection'
                                
                            >
                                
                                
                                {lodgingData.map((item) => {
                                    return(
                                        <div>
                                            
                                            <LodgingCard item={item} key={`lodging${item.name}`}></LodgingCard>
                                        </div>
                                        
                                    ) 
                                })
                                }
                            </div>
                        </div>
                    </motion.div>
                )}
                
            </div>
        </div>
    )
}

export default Lodging