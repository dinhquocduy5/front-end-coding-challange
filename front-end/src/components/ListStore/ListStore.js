import React, { useEffect, useState } from "react";
import StoreItem from "../StoreItem/StoreItem";
import styles from "./ListStore.module.css";
import { axiosClient } from "../../api";

function ListStore() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchStore() {
      await axiosClient
        .get("stores")
        .then((res) => setData(res))
        .catch();
    }
    fetchStore();
  }, []);

  return (
    <div className={styles.container}>
      {data?.data?.map((item, key) => {
        return (
          <StoreItem data={{ ...item, detailStore: data.included }} key={key} />
        );
      })}
    </div>
  );
}

export default ListStore;
