import { Container, Nav, Navbar } from "react-bootstrap";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const Header = () => {

    return (
        <header className="header">
            <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand>
                        <NavLink to={routerPath.DEFAULT}>
                            Explore knowlege Book Library
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to={routerPath.BOOKS}>Books</NavLink>
                            <NavLink className="nav-link" to={routerPath.USERS}>Users</NavLink>
                            <NavLink className="nav-link" to={routerPath.BOOK_OPERATIONS}>Book Operations</NavLink>
                        </Nav>
                        <Nav>
                            <Logout btnClass="btn btn-secondary btn-sm"/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
};

export default Header;