
import product1 from '../assets/images/product1.png'

export default function Transactionpage() {
    return (
        <div className='flex relative flex-col-reverse md:flex-row py-8 px-8 sm:px-16 gap-8 justify-center  max-md:items-center min-h-[75vh]'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Customer Information</h1>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full' placeholder="Email" />
                    </div>
                    
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Shipping Address</h1>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full' placeholder="Name" />
                    </div>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full' placeholder="Address" />
                    </div>
                    <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                        <input type="text" className='w-full' placeholder="City" />
                    </div>
                    
                    <div className='flex flex-col-reverse  md:flex-row gap-4'>
                        <div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                            <input type="text" className='w-full' placeholder="Phone Number" />
                        </div><div className='w-full px-4 py-1.5 border rounded-xl border-dbblue flex items-center'>
                            <input type="text" className='w-full' placeholder="Zip Code" />
                        </div>
                    </div>
                    <div onClick={() => {}} className='sm:w-full flex flex-row align-middle gap-1 cursor-pointer'>
                        <input checked={true} type="checkbox" readOnly/><span>Save information for next purchase</span>
                    </div>
                    <button className='rounded-xl bg-dbblue text-white p-1.5' >Pay</button>
                </div>
            </div>
            <div className='bg-neutral-200 border-2 border-neutral-300 rounded-xl mx-1 md:w-96 h-fit'>
                <h1 className='text-2xl font-semibold p-4'>Order Summary</h1>
                <div className='flex flex-row border-y-2 border-neutral-300 p-4 gap-4 items-center'>
                    <img src={product1} className='w-1/2 h-20 object-cover rounded-xl'></img>
                    <h1 className='text-xl font-semibold'>VILOVE Women Hawaii Shirts Soft Cool Floral</h1>
                </div>
                <div className='p-4 text-lg'>
                    <div className='flex flex-row'>
                        <span>Sub Total</span>
                        <span className='flex-1 text-right'>Rp 150.000</span>
                    </div>
                    <div className='flex flex-row'>
                        <span>Shipping</span>
                        <span className='flex-1 text-right'>Rp 15.000</span>
                    </div>
                </div>
                <div className='p-4 text-lg font-semibold border-t border-neutral-300 flex flex-row'>
                    <span>Total</span>
                    <span className='flex-1 text-right'>Rp 15.000</span>
                </div>
            </div>
            <div className="w-full h-8 rounded-b-full bg-white absolute -bottom-8"></div>
        </div>
    )
}