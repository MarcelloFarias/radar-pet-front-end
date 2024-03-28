import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  Button,
} from "@nextui-org/react";
import { MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UnloggedHeader() {
  const navigate = useNavigate();

  return (
    <Navbar>
      <NavbarBrand className="text-2xl">
        <MdPets /> Radar Pet
      </NavbarBrand>

      <NavbarContent>
        <div className="w-full flex items-center justify-end">
          <NavbarItem>
            <Button
              color="success"
              radius="full"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button
              color="primary"
              radius="full"
              className="ml-5"
              onClick={() => navigate("/signup")}
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
