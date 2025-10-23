import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { House, PencilSquare } from 'react-bootstrap-icons';

const Layout = ({ children }) => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BLOG APPLICATION</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/"><House /> Home</Nav.Link>
          <Nav.Link as={Link} to="/create"><PencilSquare /> Create Post</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container className="mt-4">{children}</Container>
  </>
);

export default Layout;