import React, { useCallback, useState } from 'react';
import '../styles/PhotoFavButton.scss';
import FavIcon from './FavIcon';

function PhotoFavButton(props) {
  // const [isLiked, setIsLiked] = useState(false);

  // const handleButtonClick = () => {
  //   setIsLiked(!isLiked);
  // };

  return (
    <div
      className={`photo-list__fav-icon ${props.isLiked ? 'liked' : 'not-liked'}`} 
      onClick={props.toggleLike}
    >
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected = {props.isLiked}/>
      </div>
    </div>
  );
}

export default PhotoFavButton;