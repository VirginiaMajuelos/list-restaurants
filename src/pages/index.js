import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Card, Container, Grid, Loader } from "semantic-ui-react";
import Image from "next/image";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import notFound from "../styles/assets/No data-amico.png";
import { Navbar } from "components/Navbar";
import { Footer } from "components/Footer";
import { Loading } from "components/Loading";
import { GoFavorites } from "components/GoFavorites";

export default function HomePage({ restaurants }) {
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setClose(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (restaurants.length === 0)
    return (
      <>
        <Navbar />
        <Grid
          centered
          verticalAlign="middle"
          columns="1"
          style={{ height: "100vh" }}
        >
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1>There are no restaurans yet</h1>
              <Image src={notFound} alt="notfound" width={500} height={300} />
              <div>
                <Button inverted color="yellow">
                  Create a Restaurant
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </>
    );

  if (loading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <Header />
        <Loading />
        <Container
          style={{ paddingLeft: "80px", paddingRight: "80px" }}
        ></Container>
        <GoFavorites />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Navbar />
        <Header />
        <Container style={{ paddingLeft: "80px", paddingRight: "80px" }}>
          <Card.Group itemsPerRow={1}>
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
                    onClick={() =>
                      router.push(`/restaurants/${restaurant._id}`)
                    }
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
        <GoFavorites />
        <Footer />
      </div>
    );
  }
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
