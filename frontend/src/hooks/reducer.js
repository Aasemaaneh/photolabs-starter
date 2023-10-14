// Define action types as constants for use in the reducer
export const ACTIONS = {
  FAV_PHOTO_ADDED: "FAV_PHOTO_ADDED",                  // Action to add a photo to the likedPhotos array
  FAV_PHOTO_REMOVED: "FAV_PHOTO_REMOVED",            // Action to remove a photo from the likedPhotos array
  SET_PHOTO_DATA: "SET_PHOTO_DATA",                  // Action to set photo data
  SET_TOPIC_DATA: "SET_TOPIC_DATA",                  // Action to set topic data
  SELECT_PHOTO: "SELECT_PHOTO",                      // Action to select a specific photo for display
  DISPLAY_PHOTO_DETAILS: "DISPLAY_PHOTO_DETAILS",    // Action to display photo details modal
  GET_PHOTOS_BY_TOPIC: "GET_PHOTOS_BY_TOPIC",        // Action to get photos by topic
};

// Define the reducer function to handle state changes based on actions
function reducer(state, action) {
  switch (action.type) {
      case ACTIONS.FAV_PHOTO_ADDED:
        // Add the provided photo ID to the likedPhotos array
        return {
          ...state,
          likedPhotos: [...state.likedPhotos, action.payload.id],
        };
  
      case ACTIONS.FAV_PHOTO_REMOVED:
        // Remove the provided photo ID from the likedPhotos array
        return {
          ...state,
          likedPhotos: state.likedPhotos.filter((id) => id !== action.payload.id),
        };
  
      case ACTIONS.SET_PHOTO_DATA:
        // Set the photo data with the provided array of photos
        return {
          ...state,
          photoData: action.payload.photos,
        };
  
      case ACTIONS.SET_TOPIC_DATA:
        // Set the topic data with the provided array of topics
        return {
          ...state,
          topicData: action.payload.topics,
        };
  
      case ACTIONS.SELECT_PHOTO:
        // Select a specific photo for display and open the modal
        return {
          ...state,
          selectedPhotoId: action.payload.id,
          selectedPhotoData: action.payload.photoData,
          similarPhotosData: action.payload.similarPhotosData,
          modalVisible: true,
        };
  
      case ACTIONS.DISPLAY_PHOTO_DETAILS:
        // Close the photo details modal
        return {
          ...state,
          modalVisible: false,
        };
  
      case ACTIONS.GET_PHOTOS_BY_TOPIC:
        // Set the photo data with the provided array of photos by topic
        return {
          ...state,
          photoData: action.payload.photos,
        };
  
      default:
        // Throw an error for unsupported action types
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
}

// Export the reducer function for use in other parts of the application
export default reducer;
