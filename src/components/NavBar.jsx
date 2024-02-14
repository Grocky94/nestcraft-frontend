import React  from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signOut } from '../redux/logSlice';

const NavBar = () => {
    const router = useNavigate();
    const dispatch = useDispatch();
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const token = JSON.parse(localStorage.getItem("token"))

    const handleLogout = () => {
        dispatch(signOut());
        router('/login');
        localStorage.removeItem("token");
    }




    return (
        <div className='navBar-body'>
            <div className='navBar-sign'>
                {token ?
                    <button className='navBar-login' onClick={handleLogout}>Logout</button>
                    :
                    <button className='navBar-login' onClick={() => router('/login')}>LogIn</button>
                }

            </div>
        </div>
    )
}

export default NavBar;
