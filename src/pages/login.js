import { Button, Form, Grid, Segment } from "semantic-ui-react";
// import { useState } from "react";
// import { useRouter } from "next/router";
import { Navbar } from "components/Navbar";
import styles from "../styles/Home.module.css";

export default function login() {
  return (
    <div className={styles.backgroundSign}>
      <Navbar />

      <div className={styles.containerCard}>
        <div className={styles.cardFormRegister}>
          <h1>LOG IN</h1>
          <Form inverted>
            <Form.Input
              label="Email"
              placeholder="example@gmail.com"
              name="email"
              //   onChange={handleChange}
              //   value={newUser.email}
            />
            <Form.Input
              label="Password"
              placeholder="***********"
              name="password"
              //   onChange={handleChange}
              //   value={newUser.password}
            />
            <Button type="submit">Let`s Go!</Button>
          </Form>
          {/* <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Segment inverted style={{ padding: "25px" }}>
              <h1>Log in</h1>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
        </div>
      </div>
    </div>
  );
}
