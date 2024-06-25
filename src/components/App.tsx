import React, {lazy, useCallback, useState} from "react";
import style from './App.module.css'
import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { Story } from "../api/hackerNews";
import HNCommentType from "./HNComment";
import Header from "./Header";
import Modal from "./Modal";
import Loading from "./Loading";
import Prerender from "./Prerender";
import {mutate} from "swr";
import useInterval from "../hooks/useInterval";

const HNComment = lazy<typeof HNCommentType>(() => import("./HNComment"));


interface Props {
  count: number;
}

const App = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const [commentIds, setCommentIds] = useState([] as number[]);
  const [loading, setLoading] = useState(false);


  const onClickComment = useCallback((story: Story) => {
    setCommentIds(story.kids)
  }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    mutate('storeis')
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  //Обновляем новости каждые 30 секунд
  useInterval(onRefresh, 30000);


  return (
    <div className={style.container}>
      <section className={style.main}>
        <Header title="HackerNews"
                onRefresh={onRefresh}
        >
          <InputFilter className={style.inputContainer} onChange={setFilterText}/>
        </Header>
        {loading && <Loading/>}
        <HNStories
          count={props.count}
          filterText={filterText}
          onClickComment={onClickComment}
        />
        <Prerender visible={commentIds.length > 0}>
          <Modal onClose={() => setCommentIds([])}>
            <HNComment commentIds={commentIds}/>
          </Modal>
        </Prerender>
      </section>
    </div>
  );
};
export default App;
