import { useReducer, useEffect } from "react";
import reducer, { ACTIONS } from "./reducer"; // Import the reducer

// Initializing the application data
const useApplicationData = () => {
  const initialState = {
    photoData: [],            // Placeholder for photo data
    topicData: [],
    likedPhotos: [],
    alert: false,
    modalVisible: false,
    selectedPhotoId: null,
    selectedPhotoData: null,
    similarPhotosData: [],
    selectedTopic: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState); // Use the imported reducer

  // Function for structuring photo data
  const transformPhotoData = (photoData) => {
    return photoData.map((photo) => {
      return {
        id: photo.id,
        location: {
          city: photo.location.city,
          country: photo.location.country,
        },
        urls: {
          full: photo.urls.full,
          regular: photo.urls.regular,
        },
        user: {
          id: photo.user.id,
          username: photo.user.username,
          name: photo.user.name,
          profile: photo.user.profile,
        },
        similarPhotoIds: photo.similar_photos,
      };
    });
  };

  // Function for managing toggling likes on photos
  const toggleLike = (photoId) => {
    if (state.selectedPhotoId !== null) {
      // Check if a photo is already selected
      if (state.likedPhotos.includes(photoId)) {
        dispatch({ type: ACTIONS.FAV_PHOTO_REMOVED, payload: { id: photoId } });
      } else {
        dispatch({ type: ACTIONS.FAV_PHOTO_ADDED, payload: { id: photoId } });
      }
    } else {
      // If no photo is selected, open the modal when the image is clicked
      const selectedPhoto = state.photoData.find((photo) => photo.id === photoId);
      const photoData = {
        id: selectedPhoto.id,
        imageSource: selectedPhoto.urls.regular,
        username: selectedPhoto.user.username,
        location: selectedPhoto.location,
        profile: selectedPhoto.user.profile,
        isLiked: state.likedPhotos.includes(selectedPhoto.id),
        alert: state.alert,
        setAlert: () => {}, // Placeholder function
        setModalVisible: () => {}, // Placeholder function
        similarPhotos: selectedPhoto.similarPhotoIds || [],
      };
      dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { id: photoId, photoData } });
    }
  };

  // Function for handling clicking on a photo
  const handlePhotoClick = (id) => {
    const selectedPhoto = state.photoData.find((photo) => photo.id === id);
    const photoData = {
      id: selectedPhoto.id,
      imageSource: selectedPhoto.urls.regular,
      username: selectedPhoto.user.username,
      location: selectedPhoto.location,
      profile: selectedPhoto.user.profile,
      isLiked: state.likedPhotos.includes(selectedPhoto.id),
      alert: state.alert,
      setAlert: () => {}, // Placeholder function
      setModalVisible: () => {}, // Placeholder function
      similarPhotos: selectedPhoto.similarPhotoIds || [],
    };
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { id, photoData } });
  };

  // Function for opening the photo modal
  const openPhotoModal = (id, photoData) => {
    const selectedPhoto = state.photoData.find((photo) => photo.id === id);
    const similarPhotosData = selectedPhoto.similarPhotoIds || [];
    // Dispatch action to select a photo and display details
    dispatch({
      type: ACTIONS.SELECT_PHOTO,
      payload: { id, photoData, similarPhotosData },
    });
  };

  // Function for closing the photo modal
  const closeModal = () => {
    // Dispatch action to close the modal
    dispatch({ type: ACTIONS.DISPLAY_PHOTO_DETAILS });
  };

  // Function for fetching photos by topic
  const fetchPhotosByTopic = (topicId) => {
    fetch(`/api/topics/photos/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ACTIONS.GET_PHOTOS_BY_TOPIC, payload: { photos: transformPhotoData(data) } });
      })
      .catch((error) => {
        console.error("Error fetching photos by topic:", error);
      });
  };

  // Use a single useEffect to fetch photos and topics
  useEffect(() => {
    Promise.all([
      fetch("/api/photos").then((res) => res.json()),
      fetch("/api/topics").then((response) => response.json())
    ])
      .then(([photosData, topicsData]) => {
        // Dispatch the results to the reducer
        dispatch({
          type: ACTIONS.SET_PHOTO_DATA,
          payload: { photos: transformPhotoData(photosData) }
        });
        dispatch({
          type: ACTIONS.SET_TOPIC_DATA,
          payload: { topics: topicsData }
        });
      })
      .catch((error) => {
        console.error("Error fetching photos and topics:", error);
      });
  }, []);

  // Return the state and functions for other components to use
  return {
    ...state,
    toggleLike,
    handlePhotoClick,
    openPhotoModal,
    closeModal,
    fetchPhotosByTopic,
  };
};

export default useApplicationData;
