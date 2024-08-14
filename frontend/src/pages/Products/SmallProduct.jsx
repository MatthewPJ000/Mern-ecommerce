import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import React, { useState } from 'react';
import './component.css'

const SmallProduct = ({ product }) => {
  const [reviewCount, setReviewCount] = useState(0);

  const addReview = () => {
    setReviewCount(reviewCount + 1);
  }

  const updateReviewStars = ()=> {
    return Array.from({ length: 5}).map((_, index)=>(
      <span key={index} className={`star ${index <Math.round(reviewCount) ? 'active':''}`}>
        &#9733;
      </span>
    ))
  }

  

  const [isZoomedIn, setIsZoomedIn ] = useState(false);

  const handleImageEnter = () => {
    setIsZoomedIn(true);
  }

  const handleImageLeave = () => {
    setIsZoomedIn(false);
  }

  return (
    <div className="w-[19rem] h-[20rem] ml-[2rem] p-3 ">
      <div className="relative">
      <div
      className={`image-container ${isZoomedIn ? 'zoomed-in' : ''} w-[16rem] h-[14rem]`}
      onMouseEnter={handleImageEnter}
      onMouseLeave={handleImageLeave}
      >
          <img
          src={product.image}
          alt={product.name}
          className={`h-auto rounded image ${isZoomedIn ? 'zoomed-in' : ''}`}
          style={{ Width: '450px', Height: '346px' }}
        />
        <HeartIcon product={product} />
      </div>
      </div>
      <div id="review-section">
  
        <div id="review-stars">{updateReviewStars()}</div>
        <p id="review-count">{reviewCount} reviews</p>
        <button onClick={addReview}>Add Review</button>
      </div>

      <div className="p-4">
      
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
          <button class="bg-pink-400 text-white rounded-full font-medium px-10 py-2 ring-2 ring-pink-500 hover:bg-pink-500">
            go to shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
