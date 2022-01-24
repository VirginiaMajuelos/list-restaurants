import { Button, Form, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const NewRestaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState({
    title: "",
    cuisine: "",
    description: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    cuisine: "",
    description: "",
    location: "",
  });

  const { query, push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    if (query.id) {
      await updateRestaurant();
    } else {
      await createRestaurant();
    }
    await push("/");
  };

  const handleChange = (e) =>
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newRestaurant.title) {
      errors.title = "Title is required";
    }
    if (!newRestaurant.cuisine) {
      errors.cuisine = "Type of cuisine is required";
    }
    if (!newRestaurant.description) {
      errors.description = "Description is required";
    }
    if (!newRestaurant.location) {
      errors.location = "Location is required";
    }

    return errors;
  };

  const createRestaurant = async () => {
    try {
      await fetch("http://localhost:3000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurant),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateRestaurant = async () => {
    try {
      await fetch("http://localhost:3000/api/restaurants/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurant),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRestaurant = async () => {
    const res = await fetch(
      "http://localhost:3000/api/restaurants/" + query.id
    );
    const data = await res.json();
    setNewRestaurant({
      title: data.title,
      cuisine: data.cuisine,
      description: data.description,
      location: data.location,
    });
  };

  useEffect(() => {
    if (query.id) getRestaurant();
  }, []);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="left">
          <h1>{query.id ? "Update Restaurant" : "Create Restaurant"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={newRestaurant.title}
            />
            <Form.Input
              error={
                errors.cuisine
                  ? {
                      content: "Please enter a type of cuisine",
                      pointing: "below",
                    }
                  : null
              }
              label="Cuisine"
              placeholder="Type of cuisine"
              name="cuisine"
              onChange={handleChange}
              value={newRestaurant.cuisine}
            />
            <Form.TextArea
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={newRestaurant.description}
            />
            <Form.Input
              error={
                errors.location
                  ? { content: "Please enter a location", pointing: "below" }
                  : null
              }
              label="Location"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={newRestaurant.location}
            />
            <Button type="submit">{query.id ? "Update" : "Create"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewRestaurant;