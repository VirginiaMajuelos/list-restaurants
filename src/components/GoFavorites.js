import { Button } from "semantic-ui-react";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import sushi from "../styles/assets/sushi3.png";

export const GoFavorites = () => {
  return (
    <div className={styles.favBackground}>
      <div>
        <h2>Go Your Favorite Restaurants</h2>
        <Button inverted color="yellow">
          View
        </Button>
      </div>
      <Image className={styles.imageBack} src={sushi} alt="sushi"></Image>
    </div>
  );
};
