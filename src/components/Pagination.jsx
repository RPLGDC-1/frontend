import { useState, useMemo } from "react";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

function rangeArray(start, end) {
    if (start > end) {
        throw new Error("Start value must be less than or equal to end value.");
    }

    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}


export default function Pagination({page, totalPage, visiblePage, onPageChange}) {
    const [pageSection, setPageSection] = useState(Math.ceil(page / visiblePage) - 1 );
    const maxPageSection = useMemo(() => Math.ceil(totalPage / visiblePage) - 1, [totalPage, visiblePage]);
    const actualPage = page - 1;
    
    function setPage(newPage) {
        onPageChange(newPage+1);
    }

    function prevPageSection() {
        if (pageSection > 0) {
            setPageSection(pageSection - 1);
        }
    }

    function nextPageSection() {
        if (pageSection < maxPageSection) {
            setPageSection(pageSection + 1);
        }
    }
    return (
        <div className="flex flex-row items-center gap-2">
            <button className="w-8" ><MdChevronLeft className={"" + (pageSection == 0 ? "hidden" : "")} size="32px" onClick={prevPageSection}/></button>
            {
                rangeArray(pageSection*visiblePage, Math.min((pageSection*visiblePage) + visiblePage, totalPage)).map(e => (
                <button 
                    className={"text-lg w-12 rounded-lg  " + (e == actualPage ? "bg-black text-white" : "") } 
                    onClick={() => setPage(e)} 
                    key={e}
                >
                    {e+1}
                </button>
                ))
            }
            
            <button className="w-8" ><MdChevronRight className={"" + (pageSection == maxPageSection ? "hidden" : "")} size="32px" onClick={nextPageSection}/></button>
        </div>
    )
}