import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/vm-logo.png";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <Image src={logo} alt="logo" width={80} height={30} />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              inverted
              color="yellow"
              size="mini"
              onClick={() => router.push("/restaurants/new")}
            >
              New Restaurant
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
