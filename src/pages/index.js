import { useRouter } from "next/router";
// import Head from "next/head";
import { Button, Card, Container, Grid } from "semantic-ui-react";
import Image from "next/image";
import notFound from "../styles/assets/No data-amico.png";

export default function HomePage({ restaurants }) {
  const router = useRouter();

  if (restaurants.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "100vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no restaurans yet</h1>
            <Image src={notFound} alt="notfound" width={500} height={500} />
            <div>
              <Button inverted color="yellow">
                Create a Restaurant
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {restaurants.map((restaurant) => (
          <Card key={restaurant._id}>
            <Card.Content>
              <Card.Header>{restaurant.title}</Card.Header>
              <p>{restaurant.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button
                inverted
                color="yellow"
                onClick={() => router.push(`/restaurants/${restaurant._id}`)}
              >
                View
              </Button>
              <Button
                inverted
                color="yellow"
                onClick={() =>
                  router.push(`/restaurants/${restaurant._id}/edit`)
                }
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/restaurants");
  const restaurants = await res.json();

  return {
    props: {
      restaurants,
    },
  };
};

//1 se ejecuta getServerSideProps y después pinta lo de arriba. Es como use efect, por asi decirlo
//Basicamente la primera parte es frontend y la segunda es la petición o gestión en el backend
