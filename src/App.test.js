import Layout from "../src/components/Layout/Layout";
import Home from "./pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import CountriesTable from "./components/CountriesTable/CountriesTable";

describe("render Layout component without error", () => {
  it("should render", () => {
    render(<Layout />);
  });

  it("footer contain developer name", () => {
    const component = render(<Layout />);
    const footer = component.getByText(/sonu sharma/i);
    expect(footer).toBeInTheDocument();
  });
});

const countries = [
  {
    name: "Afghanistan",
    topLevelDomain: [".af"],
    alpha2Code: "AF",
    alpha3Code: "AFG",
    callingCodes: ["93"],
    capital: "Kabul",
    altSpellings: ["AF", "Afġānistān"],
    subregion: "Southern Asia",
    region: "Asia",
    population: 40218234,
    latlng: [33, 65],
    demonym: "Afghan",
    area: 652230,
    timezones: ["UTC+04:30"],
    borders: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
    nativeName: "افغانستان",
    numericCode: "004",
    flags: {
      svg: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
      png: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
    },
    currencies: [
      {
        code: "AFN",
        name: "Afghan afghani",
        symbol: "؋",
      },
    ],
    languages: [
      {
        iso639_1: "ps",
        iso639_2: "pus",
        name: "Pashto",
        nativeName: "پښتو",
      },
      {
        iso639_1: "uz",
        iso639_2: "uzb",
        name: "Uzbek",
        nativeName: "Oʻzbek",
      },
      {
        iso639_1: "tk",
        iso639_2: "tuk",
        name: "Turkmen",
        nativeName: "Türkmen",
      },
    ],
    translations: {
      br: "Afeganistão",
      pt: "Afeganistão",
      nl: "Afghanistan",
      hr: "Afganistan",
      fa: "افغانستان",
      de: "Afghanistan",
      es: "Afganistán",
      fr: "Afghanistan",
      ja: "アフガニスタン",
      it: "Afghanistan",
      hu: "Afganisztán",
    },
    flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
    regionalBlocs: [
      {
        acronym: "SAARC",
        name: "South Asian Association for Regional Cooperation",
      },
    ],
    cioc: "AFG",
    independent: true,
  },
];

describe("", () => {
  it("should render", () => {
    const wrapper = render(<CountriesTable countries={countries} />);
    const countryName = wrapper.getByText(/Afghanistan/i);
    expect(countryName).toBeInTheDocument();
  });
});

const sortArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const orderBy = (sortArray, direction) => {
  if (direction === "asc") {
    return [...sortArray].sort((a, b) => (a > b ? 1 : -1));
  }
  if (direction === "desc") {
    return [...sortArray].sort((a, b) => (a > b ? -1 : 1));
  }
  return sortArray;
};

describe("sorting country array", () => {
  it("check direction  asc", () => {
    expect(orderBy(sortArray, "asc").at(-1)).toBe(10);
  });

  it("check direction desc", () => {
    expect(orderBy(sortArray, "desc").at(-1)).toBe(1);
  });
});
