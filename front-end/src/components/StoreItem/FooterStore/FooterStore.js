import React, { useEffect, useState } from "react";
import styles from "./FooterStore.module.css";
import FormatDate from "../../../utils/FormatDate";
import { axiosClient } from "../../../api/index";
import axios from "axios";

function FooterStore({ data }) {
  const [countries, setCountries] = useState();
  const [urlFlag, setUrlFlag] = useState("");
  const {
    attributes: { establishmentDate, website },
    relationships: { countries: country },
  } = data;
  const time = FormatDate(establishmentDate);

  useEffect(() => {
    async function fetchContries() {
      await axiosClient
        .get("countries")
        .then((res) => setCountries(res.data))
        .catch();
    }
    fetchContries();
  }, []);

  const codeCountry = countries?.find((x) => x.id === country.data.id);

  useEffect(() => {
    async function fetchFlag(code) {
      await axios
        .get(`https://restcountries.com/v3.1/alpha?codes=${code}`)
        .then((res) => setUrlFlag(res.data[0]?.flags?.svg))
        .catch();
    }
    if (codeCountry) {
      fetchFlag(codeCountry.attributes.code);
    }
  }, [codeCountry]);

  return (
    <div className={styles.footerDetaiStore}>
      <p>
        {time} - {website}
      </p>
      <div className={styles.wrapperImg}>
        <img className={styles.flagImage} src={urlFlag} alt="flag-country" />
      </div>
    </div>
  );
}

export default FooterStore;
