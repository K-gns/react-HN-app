import React from "react";
import styled from "styled-components";
import style from './Header.module.css'
import {mutate} from "swr";

interface Props {
  title: string;
  children: React.ReactNode;
  onRefresh: () => void;
}

const handleRefreshClick = () => {
  mutate('storeis');
};

const Header = ({ title, children, onRefresh}: Props) => (
  <header className={style.headerLayout}>
    <h1 className={style.headerTitle}>{title}</h1>
    <button className={style.navButton} onClick={onRefresh}>Refresh</button>
    {children}
  </header>
);

export default Header;
