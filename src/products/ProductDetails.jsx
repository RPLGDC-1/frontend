import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdStarOutline } from "react-icons/md";

export default function ProductDetailspage() {
    const { productid } = useParams();
    const [ quantity, setQuantity ] = useState(1);
    const [ product, setProduct ] = useState(null);
    const [ error, setError ] = useState(false);

    if (!quantity || quantity < 1) {
        setQuantity(1)
    }

    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const currencyFormatter = Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
 
    async function loadProduct() {
        const response = await fetch(import.meta.env.VITE_API + `/api/products/${productid}`);
        let data;
        if (response.status == 200 && (data = await response.json()).code == 200) {
            setProduct(data.data);
        } else {
            setError(true);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [productid]);

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }  
    }
    function increaseQuantity() {
        setQuantity(quantity + 1);
    }

    if (!product && !error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >Loading...</h1>
        )
    } else if (!product && error) {
        return (
            <h1 className="text-center text-3xl min-h-[75vh] p-4" >Product not found</h1>
        )
    }

    return (
        <div className="relative flex flex-col md:flex-row py-4 sm:p-16 lg:px-32 2xl:px-96 w-full min-h-[75vh] gap-4 max-md:items-center">
            <div className="flex justify-center items-start " >
                <img className="max-md:w-4/5 object-contain" src={product.image}></img>
            </div>
            <div className="flex flex-col w-3/4 gap-2 break-words">
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                <div>
                    <div className="flex flex-row items-center"><MdStarOutline size="20px" color="orange"/> {product.rating} ratings <span className="mx-4">•</span> {formatter.format(product.sold)}+ sold</div>
                </div>
                <p className="whitespace-pre-wrap">{product.description}</p>
                <div className=" flex flex-col-reverse gap-4 min-[400px]:flex-row">
                    <div className="flex-1 flex flex-col gap-2 max-[400px]:text-center">
                        <span className="text-2xl font-semibold">{currencyFormatter.format(product.selling_price)}</span>
                        <Link to={`/transaction?productid=${product.id}&quantity=${quantity}`} className="text-xl text-center bg-dbblue text-white p-1 rounded-xl" >Buy</Link>
                    </div>
                    <div className="flex-1 flex flex-row justify-center min-[400px]:justify-end">
                        <div className="flex flex-col w-32 justify-center items-center gap-2">
                            <span className="font-semibold min-[400px]:w-full" >Quantity</span>
                            <div className="flex flex-row gap-4 items-center">
                                <button onClick={decreaseQuantity} className="text-xl font-medium">-</button>
                                <input type="text" className="appearance-none border-2 border-black text-center text-lg rounded-xl w-12 px-1" value={quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} />
                                <button onClick={increaseQuantity} className="text-xl font-medium">+</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="w-screen h-8 rounded-b-full bg-white absolute left-0 -bottom-8"></div>
        </div>
    )
}