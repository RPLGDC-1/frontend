import { useNavigate } from 'react-router-dom';

import Pagination from '../components/Pagination';
import { getToken } from '../utils/tokenStorage';

import { useState, useEffect } from 'react';

function TransactionCard({order}) {
    const currencyFormatter = Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return (
        <div className="rounded-lg flex flex-col lg:flex-row justify-center bg-neutral-200 w-full">
            <div className='flex flex-col sm:flex-row justify-center w-full'>
            <img src={order.product.image} className='ml-8 max-sm:mt-4 rounded-lg self-center object-cover h-32 aspect-[4/3]'></img>
                <div className='flex-1 m-4 flex flex-col justify-center text h-36'>
                    <h2 className=' font-semibold text-ellipsis line-clamp-2'>{order.product.name}</h2>
                    <div className='flex-1 flex flex-row items-center'>
                        <span className='flex-1'>Sub Total:</span>
                        <span className='flex-1 text-right'>{currencyFormatter.format(order.price)}</span>
                    </div>
                    <div className='flex-1 flex flex-row  items-center'>
                        <span className='flex-1'>Shipping:</span>
                        <span className='flex-1 text-right'>{currencyFormatter.format(10000)}</span>
                    </div>
                    <div className='flex-1 flex flex-row font-semibold  items-center'>
                        <span className='flex-1'>Total:</span>
                        <span className='flex-1 text-right'>{currencyFormatter.format(order.price+10000)}</span>
                    </div>
                    
                </div>
            </div>
            <div className='flex self flex-col gap-4 p-4 lg:border-l-2 border-neutral-300 justify-center'>
                {({
                    "pending": (<div className='font-semibold p-2 text-amber-500 border-2 rounded-lg border-amber-500 text-center'>Pending</div>),
                    "paid": (<div className='font-semibold p-2 text-green-500 border-2 rounded-lg border-green-500 text-center'>Paid</div>),
                    "cancel": (<div className='font-semibold p-2 text-red-500 border-2 rounded-lg border-red-500 text-center'>Cancelled</div>),
                    "expired": (<div className='font-semibold p-2 text-red-500 border-2 rounded-lg border-red-500 text-center'>Expired</div>),
                })[order.status] || (<div className='font-semibold p-2 text-gray-500 border-2 rounded-lg border-gray-500 text-center'>order.status</div>)}
                
                {(order.status == "pending") && <a href={order.payment_url} target='_blank' className='text-white bg-dbblue rounded-lg text-center p-2'>Payment</a>}
            </div>
        </div>
    )
}

export default function Orderspage() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('pending'); // pending / paid / cancel / expired
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const errors = {
        "notloggedin": "You are not logged in!",
    }

    console.log(orders)
    async function loadOrders() {
        if (!orders || !orders[status] || !orders[status][page]) {
            const bearerToken = getToken();
            const requestOptions = {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + bearerToken,
                    'Accept': 'application/json'
                }
            }
            const response = await fetch(import.meta.env.VITE_API + `/api/transactions?status=${status}&page=${page}`, requestOptions);
            let data;
            if (response.status == 200 && (data = await response.json()).code == 200) {
                if (!orders) {
                    setOrders({});
                }
                let orderData = {...orders};
                if (!orderData[status]) {
                    orderData[status] = [];
                }
                orderData[status][page] = data.data;
                setOrders(orderData);
            } else {
                // setLoadState("error");
            }
        }
    }

    useEffect(() => {
        setPage(1);
    }, [status])

    useEffect(() => {
        loadOrders();
    },[page, status])

    async function checkAuth() {
        if (!getToken()) {
            setError("notloggedin");
        } 
    }

    useEffect(() => {
        checkAuth()
    }, [])
    useEffect(() => {
        if (error == "notloggedin") {
            navigate("/login?return=true");
        }
    }, [error])

    
    if (!orders && !error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >Loading...</h1>
        )
    } else if (!orders && error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >{errors[error] || error}</h1>
        )
    }



    return (
        <div className='flex relative flex-col py-8 px-8 lg:px-48 w-full justify-start items-center min-h-[75vh] gap-4'>
            <h1 className='w-full border-b-2 border-neutral-300 text-xl font-semibold pb-1'>List Transaction</h1>
            <div className='flex flex-row content-evenly w-full gap-4 overflow-x-auto'>
                <button onClick={()=> setStatus("pending")} className={'flex-1 py-1 px-2 min-w-1/3 rounded-lg text-center border border-dbblue ' + (status == "pending" ? "text-white bg-dbblue" : "text-dbblue")}>Waiting For Payment</button>
                <button onClick={()=> setStatus("paid")} className={'flex-1 py-1 px-2 min-w-1/3 rounded-lg text-center border border-dbblue ' + (status == "paid" ? "text-white bg-dbblue" : "text-dbblue")}>Payment Completed</button>
                <button onClick={()=> setStatus("cancel")} className={'flex-1 py-1 px-2 min-w-1/3 rounded-lg text-center border border-dbblue ' + (status == "cancel" ? "text-white bg-dbblue" : "text-dbblue")}>Payment Rejected</button>
                <button onClick={()=> setStatus("expired")} className={'flex-1 py-1 px-2 min-w-1/3 rounded-lg text-center border border-dbblue ' + (status == "expired" ? "text-white bg-dbblue" : "text-dbblue")}>Payment Expired</button>
            </div>
            <div className='w-full flex flex-col gap-4' >
                { orders[status] && orders[status][page] ? orders[status][page].list.map((order, i) => (
                    <TransactionCard key={i} order={order} />
                )) : null }
            </div>
            <div className="w-screen h-8 rounded-b-full bg-white absolute left-0 -bottom-8"></div>
                <div className='absolute -bottom-4'>
                    {orders[status] && <Pagination
                        page={page}
                        totalPage={orders[status] && orders[status][1].pagination.total_page}
                        visiblePage={5}
                        onPageChange={setPage}
                    />}
                </div>
        </div>
    )
}