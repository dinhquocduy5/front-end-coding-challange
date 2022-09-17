import React, { useEffect, useRef, useState } from "react";
import styles from "./DetailStore.module.css";
import RatingStars from "./RatingStars/RatingStars";
import { axiosClient } from "../../../api";

function DetailStore({ data }) {
  const {
    id,
    attributes: { rating: rate, name: nameStore },
    relationships,
  } = data;
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      await axiosClient
        .get("books")
        .then((res) => setBooks(res.data))
        .catch();
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchAuthor() {
      await axiosClient
        .get("authors")
        .then((res) => setAuthors(res.data))
        .catch();
    }
    fetchAuthor();
  }, []);

  const booksArr = books?.filter((item) => {
    var bookStore = relationships?.books?.data?.map((book) => {
      return book.id;
    });
    if (bookStore?.includes(item.id)) {
      return item;
    }
  });

  useEffect(() => {
    const bookArrsSort = booksArr?.sort(function (a, b) {
      return b.attributes.copiesSold - a.attributes.copiesSold;
    });
    setBestSeller(bookArrsSort);
  }, [bestSeller]);

  const getAuthorFullName = (id) => {
    return authors.find((x) => x.id === id)?.attributes?.fullName;
  };

  return (
    <div>
      <div className={styles.wrapperTitle}>
        <h2 className={styles.titleStore}>{nameStore}</h2>
        <RatingStars stars={rate} storeId={id} />
      </div>
      <div className={styles.listBestSellerBook}>
        <table>
          <tr>
            <th colSpan={2}>Best-selling Books</th>
          </tr>
          {bestSeller?.length > 0 ? (
            <>
              <tr>
                <td>{bestSeller[0]?.attributes.name}</td>
                <td>
                  {getAuthorFullName(
                    bestSeller[0]?.relationships.author.data.id
                  )}
                </td>
              </tr>
              {bestSeller[1] ? (
                <tr>
                  <td>{bestSeller[1]?.attributes.name}</td>
                  <td>
                    {getAuthorFullName(
                      bestSeller[1]?.relationships.author.data.id
                    )}
                  </td>
                </tr>
              ) : null}
            </>
          ) : (
            <tr>
              <td>No data available</td>
              <td></td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
}

export default DetailStore;
