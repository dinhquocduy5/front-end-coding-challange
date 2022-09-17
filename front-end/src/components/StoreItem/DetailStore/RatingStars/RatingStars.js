import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../../api";
import "./RatingStars.css";

function RatingStars({ stars, storeId }) {
  const [rating, setRating] = useState(stars);
  const [hover, setHover] = useState(0);

  const data = JSON.stringify({
    data: {
      type: "stores",
      id: storeId,
      attributes: {
        rating,
      },
    },
  });

  useEffect(() => {
    async function changeStars() {
      await axiosClient.patch(`stores/${storeId}`, data, {
        headers: {
          "Content-Type": "application/vnd.api+json",
        },
      });
    }
    changeStars();
  }, [rating, storeId]);

  const handleChangeRating = (index) => {
    setRating(index);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleChangeRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default RatingStars;
