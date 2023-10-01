import ProductCard from "../components/ProductCard";
import Pagination from "./Pagination";

import { useRef, useState, useEffect, useMemo } from 'react';

import {MdChevronLeft, MdChevronRight, MdSearch} from 'react-icons/md';





export default function ProductBrowser({enablePagination, serverSearch}) {
    const [selectedCategory, setSelectedCategoryState] = useState(-1);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [serverSearchQuery, setServerSearchQuery] = useState("");
    const [loadState, setLoadState] = useState("loading");

    const [page, setPage] = useState(1);

    const categoriesRef = useRef([])
    const productsRef = useRef({})
    const paginationRef = productsRef.current[selectedCategory]?.pagination || {}
    const stringSearchRef = useRef("");

    const message = {
        "loading": "Loading products...",
        "loaded": "This category is empty",
        "error": "Failed to load products"
    }

    function setSelectedCategory(categories) {
        setSelectedCategoryState(categories);
        setPage(1);
    }

    async function loadCategories() {
        const response = await fetch(import.meta.env.VITE_API + "/api/categories");
        let data;
        if (response.status == 200 && (data = await response.json()).code == 200) {
            categoriesRef.current = data.data;
            setSelectedCategory(0);
        } else {
            setLoadState("error");
        }
    }

    async function loadProducts() {
        setLoadState("loading");
        setProducts([]);
        if (productsRef.current[selectedCategory] && productsRef.current[selectedCategory][page]) {
            setProducts(productsRef.current[selectedCategory][page]);
            setLoadState("loaded");
        } else {
            const response = await fetch(import.meta.env.VITE_API + `/api/products?category_id=${categoriesRef.current[selectedCategory].id}&page=${page}${ stringSearchRef.current ? "&name=" + encodeURIComponent(stringSearchRef.current) : ""}`);
            let data;
            if (response.status == 200 && (data = await response.json()).code == 200) {
                setProducts(data.data.list);
                // Store the products in a ref so we don't have to fetch it again
                if (!productsRef.current[selectedCategory]) {
                    productsRef.current[selectedCategory] = {};
                }
                productsRef.current[selectedCategory][page] = data.data.list;
                productsRef.current[selectedCategory].pagination = data.data.pagination;
                // console.log(paginationRef)
                setLoadState("loaded");
            } else {
                setLoadState("error");
            }
        }
        
    }

    function prevCategory() {
        if (selectedCategory > 0) {
            setSelectedCategory(selectedCategory - 1);
        }
    }
    function nextCategory() {
        if (selectedCategory < categoriesRef.current.length - 1) {
            setSelectedCategory(selectedCategory + 1);
        }
    }

    function stringSearchMatch(str, searchStr) {
        const words = str.split(" ");
        const searchWords = searchStr.split(" ");
        return searchWords.every(word => words.some(w => w.toLowerCase().includes(word.toLowerCase())))
    }

    function doServerSearch() {
        productsRef.current = {};
        stringSearchRef.current = serverSearchQuery;
        setPage(1);
        if (selectedCategory >= 0) {
            loadProducts();
        }
    }

    useEffect(()=>{
        loadCategories();
    },[])

    useEffect(() => {
        if (selectedCategory >= 0) {
            loadProducts();
        }
    },[selectedCategory, page])
    
    return (
      <div className="w-full h-fit flex flex-col items-center sm:items-start gap-4">
        {enablePagination ? (Object.keys(paginationRef).length ? (
        <div className="text-center sm:text-left text-lg" >
            <strong>Showing {paginationRef.total_page != 1 ? `${(page-1)*paginationRef.per_page+1} -` : ""} {products.length > paginationRef.per_page || paginationRef.total_page != 1 ? (page)*paginationRef.per_page : products.length}</strong> out
            <br />of {products.length > paginationRef.per_page || paginationRef.total_page != 1 ? paginationRef.per_page*paginationRef.total_page : products.length} Product
        </div>
        ) : (
            <div className="text-center sm:text-left text-lg" >
            <strong>Showing</strong>
            <br />Products
        </div>
        )) : null}
        
        {serverSearch 
        ? (
            <div className="flex flex-row gap-2 h-fit w-full max-sm:justify-center" >
                <div className="flex flex-row items-center gap-2 w-64 h-10 px-3 rounded-xl bg-gray-200 text-dbblue">
                    <MdSearch size="24px" />
                    <input
                    className="w-full h-full bg-transparent"
                    type="text"
                    placeholder="Search..."
                    value={serverSearchQuery}
                    onChange={(e) => setServerSearchQuery(e.target.value)}
                    />
                </div>
                <button className="bg-dbblue rounded-xl h-10 aspect-square flex justify-center items-center" onClick={doServerSearch}><MdSearch color="white" size="32px" /></button>
            </div>
        
        ) 
        : (
        <div className="flex flex-row items-center gap-2 w-64 h-10 px-3 rounded-xl bg-gray-200 text-dbblue">
            <MdSearch size="24px" />
            <input
            className="w-full h-full bg-transparent"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        )
        }

        
        <div className="flex flex-col sm:flex-row w-full h-full items-center">
          <div className="flex flex-row sm:flex-col justify-center w-full sm:w-64 gap-2">
            <ul className="flex flex-row sm:flex-col content-evenly items-stretch px-4 max-sm:overflow-x-scroll sm:overflow-y-scroll scrollbar-thin scrollbar-thumb-dbblue scrollbar-track-gray-300 scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl flex-shrink sm:h-[38rem] text-base sm:text-xl text-dbblue text-center sm:text-left">
              {categoriesRef.current.map((e, i) => (
                <li
                  onClick={() => {
                    setSelectedCategory(i);
                  }}
                  className={
                    "hover:bg-black hover:bg-opacity-10 rounded-lg cursor-pointer py-3 px-2" +
                    (i == selectedCategory ? " font-semibold" : "")
                  }
                  key={e.id}
                >
                  {e.name}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <button
                onClick={prevCategory}
                className="rounded-full p-0.5 bg-black hover:bg-dbblue"
              >
                <MdChevronLeft size="32px" color="white" />
              </button>
              <button
                onClick={nextCategory}
                className="rounded-full p-0.5 bg-black hover:bg-dbblue"
              >
                <MdChevronRight size="32px" color="white" />
              </button>
            </div>
          </div>
          <div className="w-full h-[40rem] py-1 flex flex-row flex-wrap gap-4 justify-center content-start overflow-y-scroll scrollbar-thin scrollbar-thumb-dbblue scrollbar-track-gray-300 scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl">
            {products.length > 0 ? (
              products
                .filter((e) => stringSearchMatch(e.name, searchQuery))
                .map((e) => (
                  <ProductCard
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    rating={e.rating}
                    sold={e.sold}
                    price={e.selling_price}
                  />
                ))
            ) : (
              <h1>{message[loadState]}</h1>
            )}
          </div>
        </div>
        {enablePagination && Object.keys(paginationRef).length ? (
          <div className="flex flex-col-reverse max-sm:gap-2 sm:flex-row items-center w-full">
            <span className="flex-1">
              Page {page} of {paginationRef.total_page}
            </span>
            <div>
              <Pagination
                page={page}
                totalPage={paginationRef.total_page}
                visiblePage={5}
                onPageChange={setPage}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
}