import React from "react";
import { useDeletePost } from "../recoil/posts";

const Post = ({ postData }) => {
  const deletePost = useDeletePost();
  const handleDeleteButtonClick = (id) => {
    deletePost(id);
  };
  return (
    <li className="post" id={postData.id}>
      <div className="post__profile">
        <img src={postData.picture} alt="profile_picture" />
      </div>
      <div className="post__content">
        <div className="userInfo">
          <span className="username">{postData.username}</span>
          <span className="createdAt">{postData.createdAt}</span>
        </div>
        <div className="message">{postData.content}</div>
      </div>
      <button
        className="deleteButton"
        onClick={() => {
          handleDeleteButtonClick(postData.id);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default Post;
