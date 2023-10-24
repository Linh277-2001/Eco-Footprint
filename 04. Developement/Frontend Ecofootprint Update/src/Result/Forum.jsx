import './Forum.css';
import React, { useEffect, useState } from 'react';
import Logo from './assets/logo.png';
import IconUser from './assets/userIcon.png';
import stars from './assets/bg-stars.png';
import planets from './assets/bg-planets.png';
import { Link } from 'react-router-dom';
import avatar from './assets/avatar.png';
function Forum(){
    const authors = [
        "Phạm Duy Hoàng",
        "Phạm Đức Minh",
        "Nguyễn Văn Linh",
        "Vũ Đình Tuần Anh",
    ];

    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (index) => {
        setActiveLink(index === activeLink ? null : index);
        console.log(activeLink);
    };
    useEffect(() =>{
        style={
            
        }
    })
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
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ctb">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/solution">SOLUTIONS</Link>
                                </div>
                                <div style={{ marginRight: '20px' }} className="cta cta-hvr ">
                                    <Link style={{ padding: '10px 10px', fontSize: '20px' }} to="/forum">FORUM</Link>
                                </div>
                            </div>
                            <Link to='/user'><img className='user-icon1' src={IconUser} /></Link>
                        </div>
                        <div className='container9'>
                            <div className='forum-container'>
                                <div className='forum-user'>
                                    <h1>Tác giả</h1>
                                    <div className='author-list'>
                                        {authors.map((author, index) => (
                                            <a
                                                href="#"
                                                key={index}
                                                className={activeLink === index ? 'active' : ''}
                                                onClick={() => handleLinkClick(index)}
                                            >
                                                {author}
                                            </a>
                                        ))}
                                        {/* <a href="#">Phạm Duy Hoàng</a>
                                        <a href="#">Phạm Đức Minh</a>
                                        <a href="#">Nguyễn Văn Linh</a>
                                        <a href="#">Vũ Đình Tuần Anh</a> */}
                                    </div>
                                </div>
                                <div className='forum-posts'>
                                    <div className='post'>
                                        <div className='post-header'>
                                            <a className='post-title'>Tiền bạc và nhà khoa học</a>
                                            <p className='post-content'>Một nhà khoa học, rộng hơn là một nền khoa học, tất yếu cần tiền, nhưng cũng cần nhiều hơn thế nữa.</p>
                                        </div>
                                        <div className='user-info'>
                                            <img className='user-avatar' src={avatar} alt="User Avatar" />
                                            <p className='user-name'>Phạm Duy Hoàng</p>
                                        </div>
                                    </div>
                                    <div className='post'>
                                        <div className='post-header'>
                                            <a className='post-title'>Tiền bạc và nhà khoa học</a>
                                            <p className='post-content'>Một nhà khoa học, rộng hơn là một nền khoa học, tất yếu cần tiền, nhưng cũng cần nhiều hơn thế nữa.</p>
                                        </div>
                                        <div className='user-info'>
                                            <img className='user-avatar' src={avatar} alt="User Avatar" />
                                            <p className='user-name'>Phạm Duy Hoàng</p>
                                        </div>
                                    </div>
                                    <div className='post'>
                                        <div className='post-header'>
                                            <a className='post-title'>Tiền bạc và nhà khoa học</a>
                                            <p className='post-content'>Một nhà khoa học, rộng hơn là một nền khoa học, tất yếu cần tiền, nhưng cũng cần nhiều hơn thế nữa.</p>
                                        </div>
                                        <div className='user-info'>
                                            <img className='user-avatar' src={avatar} alt="User Avatar" />
                                            <p className='user-name'>Phạm Duy Hoàng</p>
                                        </div>
                                    </div>
                                    <div className='post'>
                                        <div className='post-header'>
                                            <a className='post-title'>Tiền bạc và nhà khoa học</a>
                                            <p className='post-content'>Một nhà khoa học, rộng hơn là một nền khoa học, tất yếu cần tiền, nhưng cũng cần nhiều hơn thế nữa.</p>
                                        </div>
                                        <div className='user-info'>
                                            <img className='user-avatar' src={avatar} alt="User Avatar" />
                                            <p className='user-name'>Phạm Duy Hoàng</p>
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
export default Forum