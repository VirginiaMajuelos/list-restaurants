import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState } from "react";

const FavoriteButton = () => {
  const [isNotFavorite, setFavorite] = useState(false);

  const handleClick = (e) => {
    setFavorite(!isNotFavorite);
    // handleSendFavorite(e)
  };

  return (
    <h4 onClick={handleClick}>
      {isNotFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </h4>
  );
};

export default FavoriteButton;
