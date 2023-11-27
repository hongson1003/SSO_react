import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { NavLink } from "react-router-dom";
import { logOut } from '../../redux/actions/accountAction';

const Header = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.account.isLogin);
    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_SSO}/login?serviceURL=${process.env.REACT_APP_SERVICE}`;
    }

    const handleLogout = () => {
        dispatch(logOut());
    }

    return (
        <>
            <nav className="header">
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink></li>
                    <li> <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>About</NavLink></li>
                </ul>
                <ul>
                    {isLogin ?
                        <>
                            <li><span className='px-3 text-white fw-bold'>Welcome, Nguyễn Hồng Sơn</span></li>
                            <li><i className="bi bi-box-arrow-right"
                                onClick={handleLogout}
                            ></i></li>
                        </> :
                        <li><i className="bi bi-box-arrow-in-left" onClick={handleLogin}></i></li>
                    }


                </ul>
            </nav >
        </>
    )
}

export default Header;