import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData, setIsFilter, setProductData } from "../redux/reducer/productReducer";


const SideBar = () => {
    const dispatch = useDispatch();
    const filteredData = useSelector((state: any) => state.products.filteredData);

    const productData = useSelector((state: any) => state.products.productData);
    const [data, setData] = useState(filteredData);
    const [allCategoryClicked, setAllCategoryClicked] = useState(true);

    const [range, setRange] = useState({
        low: 0,
        high: 0
    })

    const categoryData = productData.map((product: any) => product.category)
    let dataSet = new Set(categoryData);
    const categories = [];
    categories.push("All Categories")
    for (let i of dataSet) {
        categories.push(i);
    }

    const selectCategory = (e: any) => {
        try {
            const category = e.target.id;
            if (category === "All Categories") {
                dispatch(setIsFilter(false))
                setAllCategoryClicked(true);
            } else {
                const selectedCategoryData = productData.filter((product: any) => product.category === category);
                setAllCategoryClicked(false);
                dispatch(setFilteredData(selectedCategoryData));
                setData(selectedCategoryData);
                dispatch(setIsFilter(true))
                setPriceRange(selectedCategoryData);
            }
        } catch (error) {
            console.log(error)
        }


    }

    function setPriceRange(data: {}[]) {
        try {
            const prices = data.map((d: any) => d.price);

            let low = Math.min(...prices);
            let high = Math.max(...prices)

            setRange({
                low, high
            })
        } catch (error) {
            console.log(error)
        }

    }
    const handlePriceRange = (e: any) => {
        try {
            const priceRange = e.target.id;
            let selectePriceRange = [];
            if (priceRange === "lowRange") {
                selectePriceRange = data.filter((d: any) => d.price >= range.low && d.price <= range.low + 100)
            } else if (priceRange === "underRange") {
                selectePriceRange = data.filter((d: any) => d.price < range.low + 101)
            } else if (priceRange === "ltohRange") {
                selectePriceRange = data.filter((d: any) => d.price >= range.low + 101 && d.price <= range.high)
            } else if (priceRange === "aboveRange") {
                selectePriceRange = data.filter((d: any) => d.price > range.high)
            }

            dispatch(setFilteredData(selectePriceRange));
        } catch (error) {
            console.log(error)
        }

    }

    const handleStarRating = (e: any) => {
        try {
            const starType = +e.target.id[0];
            let selectedStar = data.filter((d: any) => Math.floor(d.rating) === starType);

            dispatch(setFilteredData(selectedStar));
        } catch (error) {
            console.log(error)
        }

    }

    return <>
        <div className="row filters">
            <div className="col">
                <p>Categories:</p>
                <div onClick={selectCategory} style={{ color: "blue" }}>
                    {
                        categories.map((category: string) => {
                            return <p key={category} className="category" id={category} >{category}</p>;
                        })
                    }
                </div>

                {
                    !allCategoryClicked && <>
                        <p> Price:</p>
                        <div onClick={handlePriceRange} style={{ color: "red" }}>

                            <p id="lowRange" className="priceRange">{range.low} - {range.low + 100}</p>
                            <p id="underRange" className="priceRange">Under {range.low + 101}</p>
                            <p id="ltohRange" className="priceRange">{range.low + 101} - {range.high}</p>
                            <p id="aboveRange" className="priceRange">Above {range.high}</p>
                        </div>
                    </>
                }


                {
                    !allCategoryClicked && <>
                        <p>Avg. Rating</p>
                        <div onClick={handleStarRating}>
                            <p id="5star" className="starRange">⭐⭐⭐⭐⭐</p>
                            <p id="4star" className="starRange">⭐⭐⭐⭐</p>
                            <p id="3star" className="starRange">⭐⭐⭐</p>
                            <p id="2star" className="starRange">⭐⭐</p>
                            <p id="1star" className="starRange">⭐</p>
                        </div>
                    </>
                }



            </div>

        </div>

    </>
}

export default SideBar;