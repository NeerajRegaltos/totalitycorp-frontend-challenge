import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../redux/reducer/productReducer";



const SortItems = () => {

    const dispatch = useDispatch();
    const filteredData = useSelector((state: any) => state.products.filteredData);

    const handleSort = (e: any) => {
        try {
            const type = e.target.id;

            let sortedArr = [];
            if (type === "lh") {
                sortedArr = [...filteredData].sort((a: any, b: any) => a.price - b.price);
            } else if (type === "hl") {
                sortedArr = [...filteredData].sort((a: any, b: any) => b.price - a.price);
            } else if (type === "lthr") {
                sortedArr = [...filteredData].sort((a: any, b: any) => a.rating - b.rating);
            } else if (type === "htlr") {
                sortedArr = [...filteredData].sort((a: any, b: any) => b.rating - a.rating);
            }
            dispatch(setFilteredData(sortedArr));

        } catch (error) {
            console.log(error);
        }

    }


    return <>
        <div className="position-relative mt-2 me-3">
            <div className="btn-group position-absolute top-0 end-0 sorting">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort by:
                </button>
                <ul className="dropdown-menu" onClick={handleSort}>
                    <li><a className="dropdown-item" id="lh">Price: low to high</a></li>
                    <li><a className="dropdown-item" id="hl">Price: high to low</a></li>
                    <li><a className="dropdown-item" id="lthr">Ratings: low to high</a></li>
                    <li><a className="dropdown-item" id="htlr">Ratings: high to low</a></li>
                </ul>
            </div>
        </div>

    </>
}

export default SortItems;