import React from 'react';
import PhotoFavButton from './PhotoFavButton';
import '../styles/PhotoListItem.scss';

const PhotoListItem = (props) => {
  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the parent container
    props.toggleLike(props.id); // Call the toggleLike function with the photo id
  };

  const handleImageClick = () => {
    // You can define a different action for image click here if needed
    props.onClick(props.id);
  };

  return (
    <div className="photo-list__item" onClick={props.onClick}>
      <div className="photo-list__fav-button">
        <PhotoFavButton
          isLiked={props.isLiked}
          toggleLike={handleFavoriteClick}
          alert={props.alert}
          setAlert={props.setAlert}
          id={props.id}
        />
      </div>
      <div className="photo-list__image-container" key={props.id}>
        <img
          src={props.imageSource}
          alt={`Photo by ${props.username}`}
          className="photo-list__image"
          onClick={handleImageClick} // Handle image click separately
        />
      </div>
      <div className="photo-list__user-details">
        <div className="photo-list__user-info">
          <img
            src={props.profile}
            alt={`Profile of ${props.username}`}
            className="photo-list__user-profile"
          />
          <p>{props.username}</p>
        </div>
        <p className="photo-list__user-location">
          {`${props.location.city}, ${props.location.country}`}
        </p>
      </div>
    </div>
  );
};

export default PhotoListItem;
