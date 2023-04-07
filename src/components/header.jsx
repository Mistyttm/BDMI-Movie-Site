import { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

function Header() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Brand</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Signup</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default Header;