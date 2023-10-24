import './Solution.css';
import Logo from './assets/logo.png';
import IconUser from './assets/userIcon.png';
import stars from './assets/bg-stars.png';
import planets from './assets/bg-planets.png';
import city from './assets/city.png';
import energy from './assets/energy.png';
import food from './assets/food.png';
import pledge from './assets/pledge-planet.png';
import population from './assets/population.png';
import { Link } from 'react-router-dom';
function Solution(){
    return(
        <>
            <div className='radial-gradient1'>
                <div style={{ backgroundImage: `url(${stars})`, width: '100%', height: '100%', position: 'absolute' }} className='result_layout7'>
                    <div style={{ backgroundImage: `url(${planets})`, width: '100%', height: '100%', position: 'absolute' }} className='result_planets'>
                        <div className="heading-container head_result">
                            <img className='logo' src={Logo} />
                            <div className='button_head'>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/result">SUMMARY</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/detail">detailed statistics</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/solution">SOLUTIONS</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/forum">FORUM</Link>
                                </div>
                            </div>
                            <Link to='/user'><img className='user-icon1' src={IconUser} /></Link>
                        </div>
                        <div className='wrapper'>
                            <div className='container7'>
                                <div className='container-content'>
                                    <div className='content7'>
                                        <div>
                                            <div className="sub-title">#MOVETHEDATE</div>
                                            <p className="main-title">Solutions</p>
                                        </div>
                                        <div className='pledge-container'>
                                            <div className='pledge fade-to-right'>
                                                <div className='image-solution'>
                                                    <img src={city}/>
                                                </div>
                                                <div className='text-container7'>
                                                    <p className="main-title">City</p>
                                                    <p className='caption1'>With 70-80% of the world’s population expected to live in cities by 2050, smart urban planning and development strategies are crucial to managing our resources.</p>
                                                    <p className='caption3'>Visit your city’s website and challenge your city leaders to support sustainability policies.</p>
                                                </div>
                                            </div>
                                            <div className='pledge fade-to-left'>
                                                <div className='image-solution'>
                                                    <img src={energy} />
                                                </div>
                                                <div className='text-container7'>
                                                    <p className="main-title">Energy</p>
                                                    <p className='caption1'>Renewable energy is a direct path to reducing your Ecological Footprint and addressing climate change.</p>
                                                    <p className='caption3'>Can you take transit, bicycle or walk instead of driving solo at least once a month? Once a week?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pledge-container'>
                                            <div className='pledge fade-to-right'>
                                                <div className='image-solution'>
                                                    <img src={food} />
                                                </div>
                                                <div className='text-container7'>
                                                    <p className="main-title">Food</p>
                                                    <p className='caption1'>Diet and cutting food waste are powerful sustainability levers.</p>
                                                    <p className='caption3'>Can you be a smarter shopper and reduce food waste? Can you try a new vegetarian recipe once a month? Once a week?</p>
                                                </div>
                                            </div>
                                            <div className='pledge fade-to-left'>
                                                <div className='image-solution'>
                                                    <img src={population} />
                                                </div>
                                                <div className='text-container7'>
                                                    <p className="main-title">Population</p>
                                                    <p className='caption1'>Addressing population size is essential to creating a sustainable future for all within our planet’s ecological budget.</p>
                                                    <p className='caption3'>You can choose the size of your family to affect our long-term Footprint. Support women’s rights and access to family planning.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pledge-container'>
                                            <div className='pledge fade-to-right'>
                                                <div className='image-solution'>
                                                    <img src={pledge} />
                                                </div>
                                                <div className='text-container7'>
                                                    <p className="main-title">Planet</p>
                                                    <p className='caption1'>Protecting and regenerating the natural ecosystems that our well being depends on is essential to living in balance with the Earth.</p>
                                                    <p className='caption3'>What can you do at home, at work, or in your community to nurture nature?</p>
                                                </div>
                                            </div>
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
export default Solution;