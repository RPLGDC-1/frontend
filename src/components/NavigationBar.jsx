import DBLogo from '/icons/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useEffect, useState } from 'react';
import getProfile from '../utils/profile';
import { useLocation } from 'react-router-dom';

export default function NavigationBar() {
    const [userProfile, setUserProfile] = useState(null);
    const locationState = useLocation();
    async function refreshProfile() {
        try {
            const userProfile = await getProfile();
            setUserProfile(userProfile);
            console.log(userProfile)
        } catch (error) {
            setUserProfile(null);
        }
    }

    function logoutUser() {
        logout();
        // refreshProfile();
        location.reload();
    }

    useEffect(() => {
        refreshProfile();
    }, [])


    useEffect(() => {
        refreshProfile();
    }, [locationState])
    return (
        <div className="flex flex-col top-0 sticky z-50 justify-center items-center bg-[#1e1e1e] text-[#cdcdcd]">
            <Link className='sm:hidden p-4 h-20' to="/"><img className="h-full" src={DBLogo} alt="Dunia Belanja"></img></Link>
            <div className="w-full flex flex-row justify-evenly sm:text-xl items-stretch ">
                <NavLink className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50" to="/404">ABOUT US</NavLink>
                <NavLink className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50" to="/products">PRODUCT</NavLink>
                <Link className='hidden sm:block p-4 w-full h-20' to="/"><img className="w-full h-full" src={DBLogo} alt="Dunia Belanja"></img></Link>
                {userProfile 
                ? (
                    <>
                        <NavLink className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 text-center" to="/profile">{userProfile.name}</NavLink>
                        <button className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50" onClick={logoutUser}>LOG OUT</button>
                    </>
                )
                : (
                    <>
                        <NavLink className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50" to="/register">REGISTER</NavLink>
                        <NavLink className="navlink w-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50" to="/login">LOGIN</NavLink>
                    </>
                    
                )}
                
            </div>
        </div>
    )
}