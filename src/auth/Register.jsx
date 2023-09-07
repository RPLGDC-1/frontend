import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register, isLoggedIn } from '../utils/auth';

import registerimg from '../assets/images/storeisle.png'
import { NavLink } from 'react-router-dom'

import { MdMailOutline,MdLock,MdPerson,MdLockOutline } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Registerpage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberState, setRememberState] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            setLoggedIn(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    })

    async function registerHandler() {
        if (formData.name && formData.email && formData.password && formData.passwordConfirm) {
            try {
                setRegisterLoading(true);
                await register(formData.name, formData.email, formData.password, formData.passwordConfirm, rememberState);
                navigate('/');
            } catch (error) {
                setRegisterLoading(false);
                setRegisterError(error.toString());
            }
        } else {
            setRegisterError("Please fill all the fields");
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
                <h1 className='text-4xl md:text-5xl font-semibold' >Register To<br/>Dunia Belanja</h1>
                <p>Thank you for Choosing Dunia Belanja. let's access our best recommendation for you</p>
                <div className='flex flex-col gap-4' >
                    <div className='font-semibold border-b-2' >
                        <div className='relative top-0.5 flex flex-row gap-8 max-sm:justify-center'>
                            <NavLink to="/register" className="border-b-2 border-dbblue px-4">Register</NavLink>
                            <NavLink to="/login" className="px-4">Login</NavLink>
                        </div>
                        
                    </div>
                    <div className='flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2' >
                        <MdPerson size="32"/>
                        <input className='w-full text-black outline-none' type="text" placeholder="Masukkan Nama Anda" name="name" value={formData.name} onChange={updateFormData}></input>
                    </div>
                    <div className='flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2' >
                        <MdMailOutline size="32"/>
                        <input className='w-full text-black outline-none' type="text" placeholder="Masukkan Email Anda" name="email" value={formData.email} onChange={updateFormData}></input>
                    </div>
                    <div className='flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2'>
                        <MdLock size="32"/>
                        <input className='w-full text-black outline-none' type={showPassword ? "text" : "password"} placeholder="Masukkan Password Anda" name="password" value={formData.password} onChange={updateFormData}></input>
                        <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 
                          <IoEyeOutline className='cursor-pointer' size="32"/>
                        : <IoEyeOffOutline className='cursor-pointer' size="32" />}
                        </button>
                    </div>
                    <div className={'flex flex-row align-middle w-full border rounded-xl border-dbblue p-2 gap-2 ' + (formData.password ? "" : "hidden")}>
                        <MdLockOutline size="32"/>
                        <input className='w-full text-black outline-none' type={showPassword ? "text" : "password"} placeholder="Konfirmasi Password Anda" name="passwordConfirm" value={formData.passwordConfirm} onChange={updateFormData}></input>
                        <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 
                          <IoEyeOutline className='cursor-pointer' size="32"/>
                        : <IoEyeOffOutline className='cursor-pointer' size="32" />}
                        </button>
                        
                    </div>
                    <div className='flex flex-col items-center sm:flex-row max-sm:gap-1 justify-evenly'>
                        <div onClick={() => {setRememberState(!rememberState)}} className='sm:w-full flex flex-row align-middle gap-1 cursor-pointer'>
                            <input checked={rememberState} type="checkbox" readOnly/><span>Remember me</span>
                        </div>
                        
                    </div>
                    <button className='rounded-md text-white bg-dbblue py-2' onClick={registerHandler} disabled={registerLoading}>{registerLoading ? "REGISTERING" : "REGISTER"}</button>
                    {registerError ? <span className='w-full text-red-600 text-center'>{registerError}</span> : null}
                </div>

            </div>
            <img src={registerimg} className=" md:relative md:-top-6 w-full md:h-[103vh] mix-blend-multiply md:rounded-br-3xl max-md:overflow-hidden md:w-5/12 object-cover object-center"></img>
            
        </div>
    )
}
