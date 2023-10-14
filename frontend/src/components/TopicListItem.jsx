import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const topicHandler = () => {
    props.fetchPhotosByTopic(props.id);
    
  };

  return (
    <div className="topic-list__item">
            <span onClick={topicHandler}>{props.title}</span>
        </div>
  );
};

export default TopicListItem;
