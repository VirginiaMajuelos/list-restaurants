import { Button, Grid, Form, Segment } from "semantic-ui-react";
import Image from "next/image";
import { Navbar } from "components/Navbar";
import styles from "../styles/Home.module.css";
import pun from "../styles/assets/punHeader.png";

export default function signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //Validation
    if (!email || !email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    console.log(data);
  };

  const handleChange = (e) => {};

  return (
    <div className={styles.backgroundSign}>
      <Navbar />
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="left">
            <Segment inverted style={{ padding: "25px" }}>
              <Image src={pun} alt="imageHeader" width={80} height={80} />
              <h1>Sign Up</h1>
              <Form inverted onSubmit={handleSubmit}>
                <Form.Input
                  // error={
                  //   errors.email
                  //     ? { content: "Please enter your email", pointing: "below" }
                  //     : null
                  // }
                  label="Email"
                  placeholder="example@gmail.com"
                  name="email"
                  onChange={handleChange}
                  // value={newUser.email}
                />
                <Form.Input
                  // error={
                  //   errors.password
                  //     ? {
                  //         content: "Please enter a password",
                  //         pointing: "below",
                  //       }
                  //     : null
                  // }
                  label="Password"
                  placeholder="***********"
                  name="password"
                  onChange={handleChange}
                  // value={newUser.password}
                />
                <Button type="submit">Save</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
