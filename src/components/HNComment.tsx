import React from "react";
import { useCommentsResource } from "../api/hackerNewsResource";
import DOMPurify from "dompurify";
import style from "./HNComment.module.css";

interface Props {
  commentIds: number[];
}

const HNComment = (props: Props) => {
  const { data: comments } = useCommentsResource(props.commentIds);

  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className={style.commentsContainer}>
      <h2 className={style.commentHeader}>Comments</h2>
      {comments &&
        comments.map(comment => (
          <div key={comment.id} className={style.comment}>
            <div className={style.commentHeader}>
              <h3 className={style.commentAuthor}>{comment.by}</h3>
              <span className={style.commentTime}>
                {new Date(comment.time * 1000).toLocaleString()}
              </span>
            </div>
            <p className={style.commentText} dangerouslySetInnerHTML={createMarkup(comment.text)}/>
          </div>
        ))}
    </div>
  );
};

export default HNComment;
