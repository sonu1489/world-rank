import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import { useRouter } from "next/router";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};
const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const router = useRouter();
  // console.log("router", router);

  const getBorders = async () => {
    if (await country.borders) {
      const borders = await Promise.all(
        country.borders.map((border) => {
          return getCountry(border);
        })
      );
      setBorders(borders);
    }
  };
  // console.log(borders);

  const changeFromBorder = (id) => {
    router.push(`/country/${id}`);
  };

  useEffect(() => {
    getBorders();
  }, [changeFromBorder]);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>SubRegion</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.length > 0 ? (
                  borders.map(({ flag, name, alpha3Code }) => (
                    <div
                      key={name}
                      className={styles.details_panel_borders_country}
                      onClick={() => changeFromBorder(alpha3Code)}
                    >
                      <img src={flag} alt={name} />
                      <div className={styles.details_panel_borders_name}>
                        {name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div> no Neighbouring countries</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};

// export const getServerSideProps = async ({ params }) => {
//   const country = await getCountry(params.id);
//   return {
//     props: {
//       country,
//     },
//   };
// };
