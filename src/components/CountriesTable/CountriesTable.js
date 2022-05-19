import styles from "./Countriestable.module.css";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useState } from "react";
import Link from "next/link";

const orderBy = (countries, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRoundedIcon color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRoundedIcon color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState("");
  const orderedCountires = orderBy(countries, direction);

  const SwitchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button className={styles.heading_name} onClick={SwitchDirection}>
          <div>name</div>
          <SortArrow direction={direction} />
        </button>

        <button className={styles.heading_population} onClick={SwitchDirection}>
          <div>population</div>
          <SortArrow direction={direction} />
        </button>

        <button
          data-testid="switchdirection"
          className={styles.heading_area}
          onClick={SwitchDirection}
        >
          <div>
            Area (km <sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {/* <SortArrow direction={direction} /> */}
        </button>

        <button className={styles.heading_gini} onClick={SwitchDirection}>
          <div>Gini</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      {orderedCountires.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img loading="lazy" src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
