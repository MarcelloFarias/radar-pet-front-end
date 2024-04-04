import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  Button,
  Link,
} from "@nextui-org/react";
import { MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UnloggedHeader() {
  const navigate = useNavigate();

  return (
    <Navbar>
      <NavbarBrand className="text-2xl">
        <MdPets /> <span className="navbar-brand-text">Radar Pet</span>
      </NavbarBrand>

      <NavbarContent>
        <div className="container flex items-center justify-end">
          <NavbarItem>
            <Link href="/" className="text-neutral-500">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="success"
              radius="full"
              onClick={() => navigate("/login")}
              className="ml-5"
            >
              Entrar
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button
              color="primary"
              radius="full"
              onClick={() => navigate("/signup")}
              variant="flat"
              className="ml-5"
            >
              Cadastre-se
            </Button>
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

export default UnloggedHeader;
