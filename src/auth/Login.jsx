import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { login, isLoggedIn } from '../utils/auth';

import loginimg from '../assets/images/loginimg.jpg'
import { Link } from 'react-router-dom'

import { MdMailOutline,MdLock } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Loginpage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberState, setRememberState] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (isLoggedIn()) {
            setLoggedIn(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    })

    async function loginHandler(e) {
        e.preventDefault();
        if (formData.email && formData.password) {
            try {
                setLoginLoading(true);
                await login(formData.email, formData.password, rememberState);
                if (searchParams.get('return') === "true") {
                    navigate(-1);
                } else {
                    navigate('/');
                }
            } catch (error) {
                setLoginLoading(false);
                setLoginError(error.toString());
            }
        } else {
            setLoginError("Email or password cannot be empty!");
        }
        
    }
    // console.log(formData)
    function updateFormData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (loggedIn) {
        return (
            <div className="relative top-6 bg-white rounded-b-3xl max-md:overflow-hidden w-full h-screen flex flex-col text-center text-2xl">
                <h1>Already Logged In!</h1> 
                <h1>You will be redirected to our homepage</h1> 
            </div>
        )
    }

    return (
        <div className="relative top-6 bg-white rounded-b-3xl max-md:overflow-hidden w-full h-screen flex flex-col md:flex-row justify-stretch content-stretch">
            <div className="flex flex-col gap-4 w-full text-dbblue py-12 sm:py-24 px-12 sm:px-24">
                <h1 className='text-4xl md:text-5xl font-semibold' >Login To<br/>Dunia Belanja</h1>
                <p>Thank you for get back to Dunia Belanja. Let's access our best recommendation for you</p>
                <div className='flex flex-col gap-4' >
                    <div className='font-semibold border-b-2' >
                        <div className='relative top-0.5 flex flex-row gap-8 max-sm:justify-center'>
                            <Link to={"/register" + (searchParams.toString() ? "?" + searchParams.toString() : "")} replace={true} className="px-4">Register</Link>
                            <Link to={"/login" + (searchParams.toString() ? "?" + searchParams.toString() : "")} replace={true} className="border-b-2 border-dbblue px-4">Login</Link>
                        </div>
                        
                    </div>
                    <form className='flex flex-col gap-4' onSubmit={loginHandler}>
                        <div className='flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2' >
                            <MdMailOutline size="32"/>
                            <input className='w-full text-black outline-none' type="text" placeholder="Masukkan Email Anda" name='email' value={formData.email} onChange={updateFormData}></input>
                        </div>
                        <div className='flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2'>
                            <MdLock size="32"/>
                            <input className='w-full text-black outline-none' type={showPassword ? "text" : "password"} placeholder="Masukkan Password Anda" name='password' value={formData.password} onChange={updateFormData}></input>
                            <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 
                            <IoEyeOutline className='cursor-pointer' size="32"/>
                            : <IoEyeOffOutline className='cursor-pointer' size="32" />}
                            </span>
                        </div>
                        <div className='flex flex-col items-center sm:flex-row max-sm:gap-1 justify-evenly'>
                            <div onClick={() => {setRememberState(!rememberState)}} className='sm:w-full flex flex-row align-middle gap-1 cursor-pointer'>
                                <input checked={rememberState} type="checkbox" readOnly/><span>Remember me</span>
                            </div>
                        
                            <div className='w-full text-center sm:text-right'>
                                <a>Forget Password?</a>
                            </div>
                            
                        </div>
                        <input type='submit' className='rounded-md text-white bg-dbblue py-2 cursor-pointer' value={loginLoading ? "LOGGING IN" : "LOGIN"}  disabled={loginLoading}/>
                        {loginError ? <span className='w-full text-red-600 text-center'>{loginError}</span> : null}
                    </form>
                    
                </div>

            </div>
            <img src={loginimg} className=" md:relative md:-top-6 w-full md:h-[106vh] mix-blend-multiply md:rounded-br-3xl max-md:overflow-hidden md:w-5/12 object-cover object-left"></img>
            
        </div>
    )
}
