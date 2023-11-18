import React, { useEffect, useState } from "react";
import {
  insertLike,
  unlike,
  getAmountLike,
  checkIsLiked,
} from "../../service/posts/LikeService";
import "./post.css";

export default function LikeButton({ id, postId }) {
  const [amountLike, setAmountLike] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const fetchAmountLikeOfPost = async (postId) => {
    const amountLike = await getAmountLike(postId);
    console.log("Amount like of post " + postId + "is:" + amountLike);
    setAmountLike(amountLike);
  };

  const fetchIsLikedStatus = async (id, postId) => {
    const liked = await checkIsLiked(id, postId);
    setIsLiked(liked);
  };

  useEffect(() => {
    fetchAmountLikeOfPost(postId);
    fetchIsLikedStatus(id, postId);
  }, [postId]);

  const handleInsertLike = async (id, postId) => {
    await insertLike(id, postId);
    setAmountLike(amountLike + 1)
    setIsLiked(true);
  };

  const handleUnlike = async (id, postId) => {
    await unlike(postId, id);
    setAmountLike(amountLike - 1);
    setIsLiked(false);
  };

  return (
    <div>
      <div>
        <button
          style={{ backgroundColor: "white", border: "none" }}
          onClick={() =>
            isLiked ? handleUnlike(id, postId) : handleInsertLike(id, postId)
          }
        >
          {amountLike}{" "}
          <i
            className={`fa-regular fa-heart ${isLiked ? "liked" : "not-liked"}`}
          />{" "}
          Thích
        </button>
      </div>
    </div>
  );
}
