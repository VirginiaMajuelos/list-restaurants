import { useState } from "react";
import { Grid, Button, Confirm, Loader, Segment } from "semantic-ui-react";
import Error from "next/error";
import { useRouter } from "next/router";
import Image from "next/image";
import restaurantDefault from "../../../styles/assets/restaurant2.jpeg";
import { Navbar } from "components/Navbar";

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
    <div>
      <Navbar />
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Segment inverted style={{ padding: "30px", margin: "25px" }}>
            <Grid.Column>
              <Image
                src={restaurantDefault}
                alt="img default"
                width={700}
                height={400}
              ></Image>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <h1>{restaurant.title}</h1>
              <p>{restaurant.cuisine}</p>
              <p>{restaurant.description}</p>
              <p>{restaurant.location}</p>
              <Button color="red" onClick={open} loading={isDeliting}>
                Delete
              </Button>
              <Button onClick={() => push("/")}>Back</Button>
            </Grid.Column>
          </Segment>
        </Grid.Row>
        <Confirm
          content={`Are you sure to delete the restaurant ${restaurant.title}`}
          header="Please confirm"
          open={confirm}
          onConfirm={handleDelete}
          onCancel={close}
        />
      </Grid>
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
