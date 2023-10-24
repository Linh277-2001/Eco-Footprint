import './Result.css';
import stars from './assets/bg-stars.png';
import planets from './assets/bg-planets.png';
import globe from './assets/globe.png';
import globe5 from './assets/5globe.png';
import Logo from './assets/logo.png'
import IconUser from './assets/userIcon.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Result(){
    const [totale, setTotalE]=useState(0);
    const footprintId = localStorage.getItem("footprintId");
    const token = localStorage.getItem("token");   
    const calculateEmission=async()=>{
        const findByActivityAndFootprint = await axios({
            url: `http://localhost:8080/api/footprint/updateEmission/${footprintId}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              }
          });
          setTotalE(findByActivityAndFootprint.data.totalEmission);
    }
    calculateEmission();

    return(
        <>
            <div className='radial-gradient'>
                <div style={{ backgroundImage: `url(${stars})`, width: '100%', height: '100%', position:'absolute'}} className='result_layout'>
                    <div style={{ backgroundImage: `url(${planets})`, width: '100%', height: '100%', position: 'absolute' }} className='result_planets'>
                        <div className="heading-container head_result">
                            <img className='logo' src={Logo} />
                            <div className='button_head'>
                                <div style={{ marginRight:'20px'}} className="cta cta-hvr">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/result">SUMMARY</Link>
                                </div>
                                <div style={{ marginRight: '20px'}} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/detail">detailed statistics</Link>
                                </div>
                                <div style={{ marginRight: '20px'}} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/solution">SOLUTIONS</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/forum">FORUM</Link>
                                </div>
                            </div>
                            <Link to='/user'><img className='user-icon1' src={IconUser} /></Link>
                        </div>
                        <div className='comet-rain' style={{height:'0%'}}>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" data-name="comet" height="173.05" id="svg-comet" viewBox="0 0 195 173.05" width="195" className="svg-defs"><symbol _ngcontent-ngb-c46="" id="comet"><path _ngcontent-ngb-c46="" d="M192.39.66c-33.66,31.46-93.3,81.16-129,108.88L3.42,156c-5,3.89-4.29,11.28.74,15.4s12.84-.83,13.1-1.07C51.09,138.62,82.6,104.72,116.64,73c8.89-8.29,66.23-59.5,77.47-70.13C196.17,1,194.24-1.08,192.39.66Z"></path></symbol></svg>
                            <svg _ngcontent-fjy-c46="" aria-hidden="true" height="0" width="0"><defs _ngcontent-fjy-c46=""><linearGradient _ngcontent-fjy-c46="" gradientUnits="userSpaceOnUse" id="gradient" x1="194.94" x2="11.72" y1="4.2" y2="161.98"><stop _ngcontent-fjy-c46="" offset="0%" stopColor="#fff" stopOpacity="0.03"></stop><stop _ngcontent-fjy-c46="" offset="100%" stopColor="var(--t-sun-color)"></stop></linearGradient></defs></svg>
                            <svg _ngcontent-fjy-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-01 comet-instance"><use _ngcontent-fjy-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-02 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" role="presentation" viewBox="0 0 195 173.05" width="195" className="comet-03 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-04 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-05 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-06 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                        </div>
                        <div className='wrapper'>
                            <div className='container7'>
                                <div className='container-content'>
                                    <div className='content7'>
                                        <div className="main-title">RESULTS</div>
                                        
                                        <p className="sub-title">The total amount of CO2 you emitted into the environment today is:</p>
                                        
                                        <h1 className='main-title'>{(totale/20).toFixed(1)}</h1>
                                        <p className="sub-title">If everyone lived like you, we would need:</p>
                                        <h1 className='main-title'>{(totale/20/20).toFixed(1)} Earths</h1>
                                        <div className='globe-container'>
                                            <div className='globe'>
                                                <img src={globe}/>
                                            </div>
                                            <div className='globe'>
                                                <img src={globe} />
                                            </div>
                                            <div className='globe'>
                                                <img src={globe} />
                                            </div>
                                            <div className='globe'>
                                                <img src={globe} />
                                            </div>
                                            <div className='globe'>
                                                <img src={globe} />
                                            </div>
                                            <div className='globe'>
                                                <img src={globe5} />
                                            </div>
                                        </div>
                                        <div className="cta cta-big cta-hvr">
                                            <Link to="/detail">See Details</Link>
                                        </div>
                                        <div className="fixed-button cta cta-hvr">
                                            <Link to="/food">Re-take the Quiz</Link>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Result;