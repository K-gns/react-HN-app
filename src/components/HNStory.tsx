import React, { memo, useTransition } from "react";
import styles from "./HNStory.module.css";
import { Story } from "../api/hackerNews";

interface Props {
  story: Story;
  onClickComment: (story: Story) => void;
}

const HNStory = memo((props: Props) => {
  const { rank, url, title, by, kids, score } = props.story;
  const commentCount = kids ? kids.length : 0;

  const [isPending, startTransition] = useTransition();

  const handleStoryClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(`.${styles.commentsLink}`)) {
      window.open(url, "_blank", "noopener noreferrer");
    }
  };


  return (
    <div className={styles.storyBox} onClick={handleStoryClick}>
      <div className={styles.rank}>{rank}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.infoBox}>
          <span className={styles.infoItem}>{score} points</span>
          <span className={styles.infoItem}>by {by}</span>
          <span className={styles.infoItem}>
            {commentCount ? (
              <a
                href=""
                className={`${styles.link} ${styles.commentsLink}`}
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    props.onClickComment(props.story);
                  });
                }}
              >
                {isPending ? "Loading..." : `${commentCount} comments`}
              </a>
            ) : (
              <span>
                {commentCount} comment
              </span>
            )}
          </span>

        </div>
      </div>
    </div>
  );
});

export default HNStory;
