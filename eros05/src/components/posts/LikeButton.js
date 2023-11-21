import React, { useEffect, useState } from "react";
import {
  insertLike,
  unlike,
  getAmountLike,
  checkIsLiked,
} from "../../service/posts/LikeService";
import "./post.css";

export default function LikeButton({ id, postId }) {
  const handleCheckIsLiked = async (postId, id) => {
    const isLiked = await checkIsLiked(postId, id);
    return isLiked.data;
  };

  const [amountLike, setAmountLike] = useState();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchDataPostIsLiked = async () => {
      const result = await handleCheckIsLiked(postId, id);
      setIsLiked(result);
    };
    fetchDataPostIsLiked();
  }, [postId, id]);

  useEffect(() => {
    const initializeIsLiked = async () => {
      const result = await handleCheckIsLiked(postId, id);
      setIsLiked(result);
    };

    initializeIsLiked();
  }, []);

  const fetchAmountLikeOfPost = async (postId) => {
    const amountLike = await getAmountLike(postId);
    setAmountLike(amountLike);
  };

  useEffect(() => {
    fetchAmountLikeOfPost(postId);
  }, [postId]);

  const handleInsertLike = async (id, postId) => {
    if (!isLiked) {
      await insertLike(id, postId);
      setAmountLike(amountLike + 1);
      setIsLiked(true);
    }
  };

  const handleUnlike = async (id, postId) => {
    if (isLiked) {
      await unlike(postId, id);
      setAmountLike(amountLike - 1);
      setIsLiked(false);
    }
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
            className={`fa-regular fa-heart ${
              isLiked ? "fa-solid fa-heart liked" : "not-liked"
            }`}
          />
          Thích
        </button>
      </div>
    </div>
  );
}
