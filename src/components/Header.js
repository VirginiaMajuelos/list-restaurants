import Image from "next/image";
import { useRouter } from "next/router";
import pun from "../styles/assets/punHeader.png";
import styles from "../styles/Header.module.css";
import { Button } from "semantic-ui-react";

export const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <Image src={pun} alt="imageHeader" width={200} height={200} />
        <h1 className={styles.title}>Know all restaurants!</h1>
      </div>
      <Button color="black" onClick={() => router.push("/restaurants/new")}>
        New Restaurant
      </Button>
    </div>
  );
};
