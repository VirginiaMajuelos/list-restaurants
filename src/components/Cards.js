import styles from "../styles/Home.module.css";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

const Cards = ({ restaurants }) => {
  const router = useRouter();

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <h4>Title</h4>
        <div>
          <p></p>
        </div>
        <hr></hr>
        <Button
          inverted
          color="yellow"
          // onClick={() => router.push(`/restaurants/${restaurant._id}`)}
        >
          View
        </Button>
        <Button
          inverted
          color="yellow"
          // onClick={() => router.push(`/restaurants/${restaurant._id}/edit`)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Cards;
