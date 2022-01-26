import { Button, Grid, Form, Segment } from "semantic-ui-react";
import { Navbar } from "components/Navbar";
import styles from "../styles/Home.module.css";

export default function signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    const password = passwordRef.current.value;
    if (!email || !email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleChange = (e) => {};

  return (
    <div className={styles.backgroundSign}>
      <Navbar />

      <div className={styles.containerCard}>
        <div className={styles.cardFormRegister}>
          <h1>SIGN UP</h1>
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
              // value="email"
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
              // value="password"
            />
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
      {/* <Grid
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
                  value="email"
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
                  value="password"
                />
                <Button type="submit">Save</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </div>
  );
}
