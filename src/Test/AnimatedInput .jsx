import { useState } from "react";
import styles from "./custom-style.module.css"; // Import your custom CSS module

const AnimatedInput = ({ label }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.form}>
      <input
        type="text"
        name="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
        required
      />
      <label className={styles["label-name"]}>
        <span className={styles["content-name"]}>{label}</span>
      </label>
    </div>
  );
};

export default AnimatedInput;
