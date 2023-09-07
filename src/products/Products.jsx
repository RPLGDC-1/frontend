import ProductBrowser from "../components/ProductBrowser"

import hangerimg from "../assets/images/hanger.jpg"

export default function Productspage() {
    
    return (
        <div className="relative w-full h-fit flex flex-col gap-8 justify-center items-center">
            <img src={hangerimg} className="w-full h-56 xl:h-80 object-cover" />
            <div className="w-full px-2 md:px-16" >
                <ProductBrowser enablePagination={true} serverSearch={true}/>
            </div>
            <div className="w-full h-8 rounded-b-full bg-white absolute -bottom-8"></div>
        </div>
    )
}