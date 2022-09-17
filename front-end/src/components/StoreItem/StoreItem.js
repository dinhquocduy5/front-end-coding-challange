import React from "react";
import styles from "./StoreItem.module.css";
import DetailStore from "./DetailStore/DetailStore";
import ImageStore from "./ImageStore/ImageStore";
import FooterStore from "./FooterStore/FooterStore";

function StoreItem({ data }) {
  const { attributes, detailStore } = data;
  const books = detailStore?.filter((item) => item.type === "books");
  const authors = detailStore?.filter((item) => item.type === "authors");
  const countries = detailStore?.filter((item) => item.type === "countries");
  return (
    <div className={styles.container}>
      <div className={styles.wrapperInfoStore}>
        <ImageStore img={attributes?.storeImage} />
        <DetailStore data={{ ...data, books, authors }} />
      </div>
      <FooterStore data={{ ...data, countries }} />
    </div>
  );
}

export default StoreItem;
