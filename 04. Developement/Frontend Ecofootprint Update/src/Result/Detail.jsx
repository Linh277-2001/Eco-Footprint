import './Detail.css';
import React from 'react';
import stars from './assets/bg-stars.png';
import planets from './assets/bg-planets.png';
import Logo from './assets/logo.png'
import IconUser from './assets/userIcon.png'
import Cacbon from './assets/carbonEmissionsImage.png'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);
const Detail = () =>{
    const data = {
        labels: ['Food', 'House', 'Car', 'Trash'],
        datasets: [
            {
                label: 'CO2',
                data: [12, 19, 3, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            <div className='radial-gradient'>
                <div style={{ backgroundImage: `url(${stars})`, width: '100%', height: '100%', position: 'absolute' }} className='result_layout'>
                    <div style={{ backgroundImage: `url(${planets})`, width: '100%', height: '100%', position: 'absolute' }} className='result_planets'>
                        <div className="heading-container head_result">
                            <img className='logo' src={Logo} />
                            <div className='button_head'>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/result">SUMMARY</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/detail">detailed statistics</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/solution">SOLUTIONS</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/forum">FORUM</Link>
                                </div>
                            </div>
                            <Link to='/user'><img className='user-icon1' src={IconUser} /></Link>
                        </div>
                        <div className='comet-rain' style={{ height: '0%' }}>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" data-name="comet" height="173.05" id="svg-comet" viewBox="0 0 195 173.05" width="195" className="svg-defs"><symbol _ngcontent-ngb-c46="" id="comet"><path _ngcontent-ngb-c46="" d="M192.39.66c-33.66,31.46-93.3,81.16-129,108.88L3.42,156c-5,3.89-4.29,11.28.74,15.4s12.84-.83,13.1-1.07C51.09,138.62,82.6,104.72,116.64,73c8.89-8.29,66.23-59.5,77.47-70.13C196.17,1,194.24-1.08,192.39.66Z"></path></symbol></svg>
                            <svg _ngcontent-fjy-c46="" aria-hidden="true" height="0" width="0"><defs _ngcontent-fjy-c46=""><linearGradient _ngcontent-fjy-c46="" gradientUnits="userSpaceOnUse" id="gradient" x1="194.94" x2="11.72" y1="4.2" y2="161.98"><stop _ngcontent-fjy-c46="" offset="0%" stopColor="#fff" stopOpacity="0.03"></stop><stop _ngcontent-fjy-c46="" offset="100%" stopColor="var(--t-sun-color)"></stop></linearGradient></defs></svg>
                            <svg _ngcontent-fjy-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-01 comet-instance"><use _ngcontent-fjy-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-02 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" role="presentation" viewBox="0 0 195 173.05" width="195" className="comet-03 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-04 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-05 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                            <svg _ngcontent-ngb-c46="" aria-hidden="true" height="173.05" viewBox="0 0 195 173.05" width="195" className="comet-06 comet-instance"><use _ngcontent-ngb-c46="" xlinkHref="#comet"></use></svg>
                        </div>
                        <div className='container8'>
                            <div className='content8'>
                                <h1 className='main-title1'> By Consumption Category</h1>
                                <div className='detail'>
                                    <div className='doughnut'>
                                        <Doughnut data={data} options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        color: '#fff',
                                                    },
                                                },
                                            },
                                        }} />
                                    </div>
                                    <div className='detail-value'>
                                        <img src={Cacbon} />
                                        <div className='detail-h1'>
                                            {data.labels.map((label, index) => (
                                                <h1 key={index}>{label}: {data.datasets[0].data[index]}</h1>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <h1 className='value-co2'>
                                    Your Carbon Footprint:{" "}
                                    {data.datasets[0].data.reduce((total, value) => total + value, 0) / data.datasets[0].data.length}
                                </h1>
                            </div>
                            <div className="fixed-button cta cta-hvr">
                                <Link to="/food">Re-take the Quiz</Link>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 
export default Detail;