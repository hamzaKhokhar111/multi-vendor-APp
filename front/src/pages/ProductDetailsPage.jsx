import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useSelector } from "react-redux";
import SuggestedProduct from "./SuggestedProduct/SuggestedProduct";
// import data from '../static/data's
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { allProducts = [] } = useSelector((state) => state.products || {});
  const { allEvents = [] } = useSelector((state) => state.events || {});
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const {name}=useParams();

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const event = allEvents.find((i) => i._id === id);
  //     setData(event);
  //   } else {
  //     const product = allProducts.find((i) => i._id === id);
  //     setData(product);
  //   }
  // }, [allProducts, allEvents, id, eventData]);

  const productName=name.replace(/-/g," ");
  console.log(name)
  useEffect(()=>{
    const data=productData.find((i)=>i.name === productName);
    setData(data);
  }, [])
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {/* {
        !eventData && (
          <>
            {data && <SuggestedProduct data={data} />}
          </>
        )
      } */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
