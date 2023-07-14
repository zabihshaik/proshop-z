import React from 'react';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        console.log('logged out');
    }

  return (
    <header>
        <Navbar bg="dark" variant = "dark" expand = "md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                      <img src={logo} alt='ProShop-Z' />
                        ProShop-Z
                    </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <LinkContainer to='/cart'>
                        <Nav.Link><FaShoppingCart />Cart
                        { 
                            cartItems.length > 0 && (
                                <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                    { cartItems.reduce((acc, currItem) => acc + currItem.qty, 0 )}
                                </Badge>
                            )
                        }
                        </Nav.Link>
                        </LinkContainer>

                        { userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link href='/login'><FaUser />Signin</Nav.Link>
                            </LinkContainer>
                        ) }
                        

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header;