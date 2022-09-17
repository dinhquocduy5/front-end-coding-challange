import React from "react";
import styles from "./ImageStore.module.css";

function ImageStore({ img }) {
  return (
    <>
      {img && (
        <img src={img} alt="image-store" className={styles.containImage} />
      )}
    </>
  );
}

export default ImageStore;
