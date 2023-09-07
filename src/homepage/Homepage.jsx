
import { Link } from "react-router-dom";

import ProductBrowser from "../components/ProductBrowser";

import heroa from '../assets/images/heroa.png';
import herob from '../assets/images/herob.png';
import bestfeatures from '../assets/images/bestfeatures.png';
import bestseller from '../assets/images/bestseller.png';
import invertedcomma from '../assets/images/invertedcomma.png';
import storeisle from '../assets/images/storeisle.png';
import packing from '../assets/images/packing.png';
import delivering from '../assets/images/delivering.png';
import person1 from '../assets/images/person1.png';
import person2 from '../assets/images/person2.png';
import person3 from '../assets/images/person3.png';

import { MdArrowOutward, MdStarOutline, MdLocationSearching, MdOutlineThumbUpAlt, MdEast } from "react-icons/md";




export default function Homepage() {
    return (
        <>
        
        <div className="w-full h-72 md:h-96 lg:h-auto flex flex-row justify-center items-center bg-black px-4 pt-4 pb-24 overflow-hidden">
            <h1 className="font-semibold text-4xl md:text-8xl lg:text-9xl text-white tracking-wide">BUILDING <br/> DIFFERENT</h1>
            <div className="flex flex-col justify-center">
                <div className="flex flex-col items-center transform rotate-90 text-white">
                    <a className="w-44 lg:w-auto lg:text-xl flex flex-row justify-center items-center py-2 px-4 gap-2 border-none rounded-full bg-dbblue font-semibold h-min hover:bg-opacity-90 cursor-pointer">
                        CONTACT US
                        <div className="border-none rounded-full p-2 bg-[#053677] bg-opacity-70 transform scale-x-[-1]">
                        <MdArrowOutward/>
                        </div>
                    </a>
                    <p className="font-thin tracking-widest shadow-inner">ONLINE SHOPPING<br/>EST 1996</p>
                </div>
            </div>
        </div>

        <div className="w-full relative -top-16">
            <div className="w-full h-16 border-none rounded-t-[4rem] bg-white"/>
            <div className="hidden min-[580px]:block absolute left-[5vw] z-10 text-gray-800"><h1 className="text-xl">DONO STORE</h1><h2>Dutch 2021</h2></div>
            <div className="flex justify-center">
                <img src={herob} className="absolute bottom-[2rem] lg:-top-[22rem] h-[36rem] sm:h-[48rem] lg:h-[72rem] object-cover z-10 pointer-events-none"/>
                <img src={heroa} className="relative -top-8 rounded-t-[4rem] w-full h-[24rem] sm:h-[32rem] lg:h-[48rem] object-cover" style={{objectPosition: "0 20%"}}/>
            </div>
            
        </div>

        <div className="w-11/12 lg:w-4/6 self-center flex flex-col items-center gap-12">
            <h1 className="text-center text-5xl sm:text-8xl font-semibold">PRODUCT<br/>CATEGORIES</h1>
            <ProductBrowser/>
            <div className="w-full flex flex-col items-center sm:items-start gap-4" >
                <Link to="/products" className="flex flex-row items-center justify-center rounded-full p-2 gap-2 w-44 bg-dbblue text-white" >All Categories <MdEast size="20px" color="white"/></Link>
            </div>
        </div>

        <div className="relative">
            <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 bg-gradient-to-b from-white to-blue-300 pt-16 pb-8">
                <div className="flex flex-col w-4/5 md:w-2/5 gap-6">
                    <h1 className="text-4xl font-semibold">BEST FEATURE<br/>FOR YOU</h1>
                    <p className="text-justify font-medium text-dbblue">"Experience the Future of Shopping with Us! Track Your Orders in Real-Time, Trust Verified Sellers with Rave Reviews, and Discover the Best Products that Define Excellence. Join the E-commerce Revolution with Dunia Belanja Today!"</p>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row">
                            <div className="h-20 w-20 flex justify-center items-center shrink-0 border-none rounded-xl bg-black mr-4">
                                <MdStarOutline color="white" size="48px"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-xl">Best Product</h4>
                                <p className="text-sm">Menyoroti produk-produk terbaik dan ditampilkan berdasarkan kategori</p>
                            </div>
                        </div>
                        <div className="flex flex-row ">
                            <div className="h-20 w-20 flex justify-center items-center shrink-0 border-none rounded-xl bg-black mr-4">
                                <MdLocationSearching color="white" size="48px"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-xl">Seller Ratings and Reviews</h4>
                                <p className="text-sm">Memungkinkan pelanggan untuk memberikan feedback tentang pengalaman mereka dengan penjual tertentu.</p>
                            </div>
                        </div>
                        <div className="flex flex-row ">
                            <div className="h-20 w-20 flex justify-center items-center shrink-0 border-none rounded-xl bg-black mr-4">
                                <MdOutlineThumbUpAlt color="white" size="48px"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-xl">Order Tracking</h4>
                                <p className="text-sm">Melacak status dan perkembangan pesanan mereka secara real-time.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={bestfeatures} className="w-64 min-[500px]:w-96 object-contain"/>
            </div>
            <div className="w-full h-16 absolute -bottom-16 bg-blue-300 border-none rounded-b-full"></div>
        </div>
        
        
        <div className="bg-[url('/bg/bestseller.png')] bg-cover bg-center flex flex-col items-center text-center py-24 text-white gap-8">
            <h1 className="text-6xl sm:text-8xl">BEST SELLER 2023</h1>
            <p className="w-1/2 text-xl text-center">Our Best Sellers Collection Awaits! Join Thousands of Satisfied Customers Who Have Chosen the Best. Elevate Your Everyday with Products That Define Superiority."</p>
            <img className="w-2/3 my-8" src={bestseller}></img>
        </div>

        <div className="relative">
            <div className="absolute w-full h-9 -top-8 bg-white rounded-t-full"></div>
            <div className="flex flex-col items-center justify-center text-center gap-8 p-16">
                <h1 className="text-5xl font-semibold">Why Us?</h1>
                <p className="w-full sm:w-2/3 text-lg sm:text-xl">"Choosing Excellence, Every Time. Discover the 'Why Us' Behind Our Unparalleled Quality. From Handpicked Selections to Rigorous Testing, We're Committed to Delivering Products That Exceed Expectations. Elevate Your Standards with Dunia Belanja - Where Quality Finds Its True Home."</p>
                <div className="flex flex-row flex-wrap gap-4 my-4 justify-center">
                    <img className="w-64 h-64 rounded-2xl object-cover" src={storeisle}></img>
                    <img className="w-64 h-64 rounded-2xl object-cover" src={packing}></img>
                    <img className="w-64 h-64 rounded-2xl object-cover" src={delivering}></img>
                </div>
            </div>
        </div>

        <div className="bg-[url('/bg/parcel.png')] bg-cover bg-center h-[64rem] ">
            <div className="w-full h-full flex items-center justify-center xl:grid grid-cols-2 grid-rows-2">
                <div className="bg-white h-1/2 xl:h-2/3 w-2/3 col-start-2 row-start-2 text-dbblue flex flex-col items-center justify-center text-center sm:text-lg font-medium p-4" >
                    <img src={invertedcomma} className="w-16"></img>
                    <p>"Dunia Belanja is my ultimate go-to for online shopping. I've bought several products from here and they have always met my expectations. High-quality products, timely delivery, and outstanding customer service keep me coming back again and again."</p>
                    <h4 className="font-bold text-2xl mt-4">Natasha</h4>
                    <h5>Customer</h5>
                </div>
            </div>  
        </div>

        <div className="flex flex-col items-center relative">
            <div className="flex flex-col justify-center items-center lg:items-start p-16 w-fit gap-4">
                <h1 className="text-2xl font-semibold w-fit text-center">What Customer Say About Us</h1>
                <div className="text-dbblue flex flex-row flex-wrap gap-4 justify-center">
                    <div className="flex flex-col justify-center text-center items-center w-64 px-4 py-8 rounded-xl bg-white drop-shadow-lg" >
                        <img src={person1} className="w-24 h-24 rounded-full object-cover m-4"></img>
                        <h4 className="text-xl font-semibold" >Benjamin Thompson</h4>
                        <h5>Customer</h5>
                        <p className="mt-4">I want to extend my gratitude to Dunia Belanja for the quality of the products they provide. </p>
                    </div>
                    <div className="flex flex-col justify-center text-center items-center w-64 px-4 py-8 rounded-xl bg-white drop-shadow-lg" >
                        <img src={person2} className="w-24 h-24 rounded-full object-cover m-4"></img>
                        <h4 className="text-xl font-semibold" >Karina Smith</h4>
                        <h5>Customer</h5>
                        <p className="mt-4">I'm extremely satisfied with my shopping experience here.</p>
                    </div>
                    <div className="flex flex-col justify-center text-center items-center w-64 px-4 py-8 rounded-xl bg-white drop-shadow-lg" >
                        <img src={person3} className="w-24 h-24 rounded-full object-cover m-4"></img>
                        <h4 className="text-xl font-semibold" >Michelle</h4>
                        <h5>Customer</h5>
                        <p className="mt-4">The products they sell are always of high quality and deliver as promised.</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-8 rounded-b-full bg-white absolute -bottom-8"></div>
        </div>
        
        </>
            
    )
}

