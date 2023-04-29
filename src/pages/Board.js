import React from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import { postsState } from "../recoil/posts";

const Board = () => {
  const [posts, setPosts] = useRecoilState(postsState);

  return (
    <section className="postsContainer">
      {posts.length === 0 ? (
        <div className="alert__no_post">게시물이 없습니다.</div>
      ) : (
        posts.map((post) => <Post key={post.id} postData={post} />)
      )}
    </section>
  );
};

export default Board;
