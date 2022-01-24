import { useState } from "react";
import { Grid, Button, Confirm, Loader } from "semantic-ui-react";
import Error from "next/error";
import { useRouter } from "next/router";

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
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{restaurant.title}</h1>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.description}</p>
          <p>{restaurant.location}</p>
          <Button color="red" onClick={open} loading={isDeliting}>
            Delete
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        content={`Are you sure to delete the restaurant ${restaurant.title}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
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
