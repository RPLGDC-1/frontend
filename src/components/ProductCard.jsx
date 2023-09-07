import { MdStarOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ProductCard({id, image, name, price, rating, sold }) {
    const navigate = useNavigate();
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const currencyFormatter = Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return (
        <div className="flex flex-col w-48 h-72 rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={()=>{navigate(`/products/${id}`)}}>
            <img className="object-cover h-56" src={image}></img>
            <div className="flex flex-col p-2 ">
                <h5 className="w-full font-semibold text-ellipsis line-clamp-2" >{name}</h5>
                <h5 className="w-full font-semibold text-ellipsis line-clamp-2" >{currencyFormatter.format(price)}</h5>
                <div className="flex flex-row items-center text-xs"><MdStarOutline size="16px" color="orange"/> {rating} ratings - {formatter.format(sold)}+ sold</div>
            </div>
        </div>
    )
}