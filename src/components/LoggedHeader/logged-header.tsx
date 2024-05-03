import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MdPets } from "react-icons/md";
import { MdLogout, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LoggedHeader() {
  const navigate = useNavigate();

  function logout() {
    const token = localStorage.getItem("user-token");

    if (token) {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-id");
      return navigate("/");
    }

    return;
  }

  return (
    <Navbar>
      <NavbarBrand className="text-2xl" onClick={() => navigate("/home")}>
        <MdPets /> <span className="navbar-brand-text">Radar Pet</span>
      </NavbarBrand>

      <NavbarContent>
        <div className="container flex items-center justify-end">
          <NavbarItem>
            <Link href="/home" className="text-neutral-500">
              Home
            </Link>

            <Link href="/my-registrations" className="text-neutral-500 ml-5">
              Meus Registros
            </Link>

            <Link href="/settings" className="text-neutral-500 ml-5 text-xl">
              <MdSettings />
            </Link>

            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button
                  className="w-2 ml-2 bg-transparent text-xl text-red-500"
                  size="sm"
                >
                  <MdLogout />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="cancel">Cancelar</DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  onClick={() => logout()}
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

export default LoggedHeader;
