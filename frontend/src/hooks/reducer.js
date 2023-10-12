export const ACTIONS = {
    FAV_PHOTO_ADDED: "FAV_PHOTO_ADDED",
    FAV_PHOTO_REMOVED: "FAV_PHOTO_REMOVED",
    SET_PHOTO_DATA: "SET_PHOTO_DATA",
    SET_TOPIC_DATA: "SET_TOPIC_DATA",
    SELECT_PHOTO: "SELECT_PHOTO",
    DISPLAY_PHOTO_DETAILS: "DISPLAY_PHOTO_DETAILS",
    GET_PHOTOS_BY_TOPIC: "GET_PHOTOS_BY_TOPIC",
  };
  
  function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FAV_PHOTO_ADDED:
          return {
            ...state,
            likedPhotos: [...state.likedPhotos, action.payload.id],
          };
    
        case ACTIONS.FAV_PHOTO_REMOVED:
          return {
            ...state,
            likedPhotos: state.likedPhotos.filter((id) => id !== action.payload.id),
          };
    
        case ACTIONS.SET_PHOTO_DATA:
          return {
            ...state,
            photoData: action.payload.photos,
          };
    
        case ACTIONS.SET_TOPIC_DATA:
          return {
            ...state,
            topicData: action.payload.topics,
          };
    
        case ACTIONS.SELECT_PHOTO:
          return {
            ...state,
            selectedPhotoId: action.payload.id,
            selectedPhotoData: action.payload.photoData,
            similarPhotosData: action.payload.similarPhotosData,
            modalVisible: true,
          };
    
        case ACTIONS.DISPLAY_PHOTO_DETAILS:
          return {
            ...state,
            modalVisible: false,
          };
    
        case ACTIONS.GET_PHOTOS_BY_TOPIC:
          return {
            ...state,
            photoData: action.payload.photos,
          };
    
        default:
          throw new Error(
            `Tried to reduce with unsupported action type: ${action.type}`
          );
      }
  }
  
  export default reducer;