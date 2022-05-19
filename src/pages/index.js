import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import { lazy } from "react";
import SearchInput from "../components/SearchInput/SearchInput";
import React, { useState } from "react";

import CountriesTable from "../components/CountriesTable/CountriesTable";

export default function Home({ countries }) {
  // console.log(countries);
  const [keyword, setKeyword] = useState("");

  const filteredCountry = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  return (
    <Layout>
      <div className={styles.inputcountries}>
        <div className={styles.counts}>Found{countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region  and SubRegion"
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountry} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
