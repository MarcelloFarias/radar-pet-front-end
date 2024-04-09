import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  Button,
  Link,
} from "@nextui-org/react";
import { MdPets } from "react-icons/md";
import { MdLogout, MdSettings } from "react-icons/md";

function LoggedHeader() {
  return (
    <Navbar>
      <NavbarBrand className="text-2xl">
        <MdPets /> <span className="navbar-brand-text">Radar Pet</span>
      </NavbarBrand>

      <NavbarContent>
        <div className="container flex items-center justify-end">
          <NavbarItem>
            <Link href="/home" className="text-neutral-500">
              Home
            </Link>

            <Link href="/home" className="text-neutral-500 ml-5">
              Meus Registros
            </Link>

            <Link href="/home" className="text-neutral-500 ml-5 text-xl">
              <MdSettings />
            </Link>

            <Button
              className="w-2 ml-2 bg-transparent text-xl text-red-500"
              size="sm"
            >
              <MdLogout />
            </Button>
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

export default LoggedHeader;
