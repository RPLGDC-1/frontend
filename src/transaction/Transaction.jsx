import { useEffect, useState } from 'react';
import product1 from '../assets/images/product1.png'
import { useNavigate, useSearchParams } from 'react-router-dom';
import getProfile from '../utils/profile';
import { getToken } from "../utils/tokenStorage";

export default function Transactionpage() {
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        zip: "",
    });
    const [saveInfo, setSaveInfo] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [orderData, setOrderData] = useState(null)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const errors = {
        "notloggedin": "You are not logged in!",
        "invalid": "Invalid product or quantity",
        "notfound": "Product not found",
        "fieldsempty": "Please fill all the fields",
    }



    const currencyFormatter = Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    async function loadData() {
        if (localStorage.getItem("shippingaddress")) {
            const savedData = JSON.parse(localStorage.getItem("shippingaddress"));
            setFormData(savedData);
            setSaveInfo(true);
        }

        const productid = searchParams.get('productid');
        const quantity = searchParams.get('quantity');

        try {
            const profile = await getProfile();
            setEmail(profile.email);
        } catch (error) {
            setError("notloggedin");
            return;
        }
        
        if (!productid || !quantity) {
            setError("invalid");
            return;
        }

        const bearerToken = getToken();
        const requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + bearerToken,
                'Accept': 'application/json'
            }
        }

        const response = await fetch(import.meta.env.VITE_API + `/api/checkout?product_id=${productid}&quantity=${quantity}`, requestOptions);
        let data;
        if (response.status == 200 && (data = await response.json()).code == 200) {
            setOrderData(data.data);
            console.log(data.data);
        } else {
            setError(data.data.quantity || data.data.product_id || "notfound");
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        if (error == "notloggedin") {
            navigate("/login?return=true");
        }
    }, [error])

    function updateFormData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function payAction() {
        if (!formData.name || !formData.address || !formData.city || !formData.phone || !formData.zip) {
            setError("fieldsempty");
            return;
        }
        setError(null);
        if (saveInfo) {
            localStorage.setItem("shippingaddress", JSON.stringify(formData));
        } else {
            localStorage.removeItem("shippingaddress");
        }
        // console.log("Pay: ",orderData,formData);
        setProcessing(true);
        const requestData = new URLSearchParams();
        requestData.append('address', `${formData.address}, ${formData.city}, ${formData.zip}`);
        requestData.append('phone', formData.phone);
        requestData.append('quantity', searchParams.get('quantity'));
        requestData.append('product_id', searchParams.get('productid'));
        console.log(requestData)
        const bearerToken = getToken();
        const requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + bearerToken,
                'Accept': 'application/json'
            },
            body: requestData
        }
        
        const response = await fetch(import.meta.env.VITE_API + `/api/checkout`, requestOptions);
        let data;
        if (response.status == 200 && (data = await response.json()).code == 200) {
            const paymentWindow = window.open(data.data.payment_url, "Payment", "width=500,height=800");
            console.log(paymentWindow)
            if (paymentWindow) {
                const closeWindow = new Promise((resolve, reject) => {
                    const interval = setInterval(() => {
                        if (paymentWindow.closed) {
                            clearInterval(interval);
                            resolve(true);
                        }
                    }, 100);
                })
                await closeWindow;
                setProcessing(false);
                navigate('/orders');
            } else {
                setProcessing(false);
            }
        } else {
            // setLoadState("error");
        }
    }

    if (!orderData && !error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >Loading...</h1>
        )
    } else if (!orderData && error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >{errors[error] || error}</h1>
        )
    }



    return (
        <div className='flex relative flex-col-reverse md:flex-row py-8 px-8 sm:px-16 gap-8 justify-center  max-md:items-center min-h-[75vh]'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Customer Information</h1>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full outline-none' placeholder="Email" value={email} disabled />
                    </div>
                    
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Shipping Address</h1>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full outline-none' placeholder="Name" value={formData.name} onChange={updateFormData} name='name' />
                    </div>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full outline-none' placeholder="Address" value={formData.address} onChange={updateFormData} name='address' />
                    </div>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full outline-none' placeholder="City" value={formData.city} onChange={updateFormData} name='city' />
                    </div>
                    
                    <div className='flex flex-col-reverse  md:flex-row gap-4'>
                        <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                            <input type="text" className='w-full outline-none' placeholder="Phone Number" value={formData.phone} onChange={updateFormData} name='phone' />
                        </div><div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                            <input type="text" className='w-full outline-none' placeholder="Zip Code" value={formData.zip} onChange={updateFormData} name='zip' />
                        </div>
                    </div>
                    <div onClick={() => setSaveInfo(!saveInfo)} className='sm:w-full flex flex-row align-middle gap-1 cursor-pointer'>
                        <input checked={saveInfo} type="checkbox" readOnly/><span>Save information for next purchase</span>
                    </div>
                    <button onClick={payAction} className='rounded-xl bg-dbblue text-white p-1.5' disabled={processing} >{processing ? "Processing..." : "Pay"}</button>
                    {
                        error && <span className='w-full text-center text-red-500 text-lg'>{errors[error]}</span>
                    }
                </div>
            </div>
            <div className='bg-neutral-200 border-2 border-neutral-300 rounded-xl mx-1 md:w-96 h-fit'>
                <h1 className='text-2xl font-semibold p-4'>Order Summary</h1>
                <div className='flex flex-row border-y-2 border-neutral-300 p-4 gap-4 items-center'>
                    <img src={orderData.product.image} className='w-1/2 h-20 object-cover rounded-xl'></img>
                    <h1 className='text-xl font-semibold'>{orderData.product.name}</h1>
                </div>
                <div className='p-4 text-lg'>
                    <div className='flex flex-row'>
                        <span>Sub Total</span>
                        <span className='flex-1 text-right'>{currencyFormatter.format(orderData.price)}</span>
                    </div>
                    <div className='flex flex-row'>
                        <span>Shipping</span>
                        <span className='flex-1 text-right'>{currencyFormatter.format(orderData.shipping_price)}</span>
                    </div>
                </div>
                <div className='p-4 text-lg font-semibold border-t border-neutral-300 flex flex-row'>
                    <span>Total</span>
                    <span className='flex-1 text-right'>{currencyFormatter.format(orderData.subtotal)}</span>
                </div>
            </div>
            <div className="w-full h-8 rounded-b-full bg-white absolute -bottom-8"></div>
        </div>
    )
}