import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import styles from "../../../styles/styles";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data._id) {
      setIsInWishlist(wishlist.some((item) => item._id === data._id));
    }
  }, [wishlist, data]);

  const handleWishlistClick = () => {
    if (!data || !data._id) return; // Ensure data and data._id are defined
    if (isInWishlist) {
      dispatch(removeFromWishlist(data));
      toast.success("Item removed from wishlist!");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Item added to wishlist!");
    }
    setIsInWishlist(!isInWishlist);
  };

  const addToCartHandler = (id) => {
    if (!data || !data._id) return; // Ensure data and data._id are defined

    const isItemExists = cart.some((item) => item._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const product_name = data ? data.name.replace(/\s+/g, "-") : '';

  return (
    <>
      {data && (
        <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
          <div className="flex justify-end"></div>
          <Link to={`/product/${product_name}`}>
            <img
              src={data.image_Url && data.image_Url[0]?.url}
              alt=""
              className="w-full h-[170px] object-contain"
            />
          </Link>
          <Link to={`/product/${product_name}`}>
            <h5 className={`${styles.shop_name}`}>{data.shop && data.shop.name}</h5>
          </Link>
          <Link to={`/product/${product_name}`} >
            <h4 className="pb-3 font-[500]">
              {data.name.length > 40 ? `${data.name.slice(0, 40)}...` : data.name}
            </h4>
            <div className="flex">
              <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
              <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
              <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
              <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
              <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data.price === 0 ? data.price : data.discount_price}$
                </h5>
                <h4 className={`${styles.price}`}>
                  {data.price ? `${data.price} $` : null}
                </h4>
              </div>
              <span className="font-[400] text-[17px] text-[#68d284]">
                {data.total_sell} sold
              </span>
            </div>
          </Link>

          <div>
            {isInWishlist ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-9 top-5"
                onClick={handleWishlistClick}
                color="red"
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={handleWishlistClick}
                color="#333"
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data._id)}
              color="#444"
              title="Add to cart"
            />
            {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
