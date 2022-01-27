import { useState } from "react";
import { Grid, Button, Confirm, Loader, Segment } from "semantic-ui-react";
import Error from "next/error";
import { useRouter } from "next/router";
import Image from "next/image";
import restaurantDefault from "../../../styles/assets/restaurant2.jpeg";
import { Navbar } from "components/Navbar";
import styles from "../../../styles/Home.module.css";

export default function RestaurantDetail({ restaurant, error }) {
  const [confirm, setConfirm] = useState(false);
  const { query, push } = useRouter();
  const [isDeliting, setIsDeleting] = useState(false);

  const deleteRestaurant = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/restaurants/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteRestaurant();
    close();
    push("/");
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <div className={styles.bgNew}>
      <Navbar />
      <div className={styles.containerCard}>
        <div className={styles.cardDetails}>
          <div>
            <Image
              src={restaurantDefault}
              alt="img default"
              width={700}
              height={350}
            ></Image>
          </div>
          <div className={styles.cardDetailsText}>
            <h1>{restaurant.title}</h1>
            <h4>
              <bold>Type of cuisine:</bold>
            </h4>
            <p>{restaurant.cuisine}</p>
            <h4>
              <bold>Description of restaurant:</bold>
            </h4>
            <p>{restaurant.description}</p>
            <h4>
              <bold>Location:</bold>
            </h4>
            <p>{restaurant.location}</p>
            <Button onClick={() => push("/")}>Back</Button>
            <Button color="red" onClick={open} loading={isDeliting}>
              Delete
            </Button>
            <Confirm
              content={`Are you sure to delete the restaurant ${restaurant.title}`}
              header="Please confirm"
              open={confirm}
              onConfirm={handleDelete}
              onCancel={close}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);

  if (res.status === 200) {
    const restaurant = await res.json();
    return {
      props: {
        restaurant,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
