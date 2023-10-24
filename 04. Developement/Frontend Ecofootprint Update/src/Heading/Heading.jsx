import { Link } from 'react-router-dom'; 
import './Heading.css'; 
import Logo from '../Home/assets/logo.png'
import IconUser from '../Home/assets/userIcon.png'

function Heading() {
  return (
    <div className="heading-container">
      <Link to="/">
       <img className='logo' src={Logo} />
      </Link>
      <Link to="/user">
        <img className='user-icon' src={IconUser} alt="User" />
      </Link>
    </div>
  );
}
export default Heading;