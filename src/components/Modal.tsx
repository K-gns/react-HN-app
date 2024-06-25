import React from "react";
import style from "./Modal.module.css";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: Props) => (
  <section className={style.modalWrapper} onClick={props.onClose}>
    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
      {props.children}
      <div className={style.buttonArea}>
        <button className={style.closeButton} onClick={props.onClose}>close</button>
      </div>
    </div>
  </section>
);

export default Modal;
