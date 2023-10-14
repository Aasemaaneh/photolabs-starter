import React from "react";
import "../styles/PhotoDetailsModal.scss";
import closeSymbol from "../assets/closeSymbol.svg";
import PhotoList from "../components/PhotoList";
import PhotoFavButton from "../components/PhotoFavButton";

const PhotoDetailsModal = (props) => {
  return (
    <div className="photo-details-modal">
       {/* Display Close button */}
      <button className="photo-details-modal__close-button" onClick={props.closeModal}>
        <img src={closeSymbol} alt="close symbol" />
      </button>
 {/* Display selected photo bigger in size */}
      <div className="photo-details-modal__images">
        <div className="photo-details-modal__image">
          <div className="photo-details-modal__like-button" onClick={props.onto}>
            <PhotoFavButton
              isLiked={props.isLiked(props.selectedPhotoData.id)}
              toggleLike={() => props.toggleLike(props.selectedPhotoData.id)}
              alert={props.alert}
              setAlert={props.setAlert}
              id={props.selectedPhotoData.id}
            />
          </div>
        </div>
        <img src={props.selectedPhotoData.imageSource} className="photo-details-modal__image" />

        <div className="photo-list__user-details photo-list__user-details-align">
          <img className="photo-list__user-profile" src={props.selectedPhotoData.profile} />
          <div className="photo-list__user-info">
            <span>{props.selectedPhotoData.username}</span>
            <br />
            <span className="photo-list__user-location">
              {`${props.selectedPhotoData.location.city}, ${props.selectedPhotoData.location.country}`}
            </span>
          </div>
        </div>
      </div>
 {/* Display similar photos */}
      <div className="photo-details-modal__photographer-info">
        <div className="photo-details-modal__similar-photos">
          <h2 className="photo-details-modal__header">Similar Photos</h2>
          <PhotoList
            photos={props.selectedPhotoData.similarPhotos}
            handlePhotoClick={props.handlePhotoClick}
            alert={props.alert}
            setAlert={props.setAlert}
            isLiked={(photoId) => props.isLiked(photoId)}
            toggleLike={(photoId) => props.toggleLike(photoId)}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;
