import styles from "./SearchInput.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRoundedIcon color="inherit" />

      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
