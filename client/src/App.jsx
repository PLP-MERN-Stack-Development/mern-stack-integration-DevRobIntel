import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PostEdit from './pages/PostEdit.jsx';
import Post from './pages/Post.jsx'; // NEW
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <Layout>
        <Container className="my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<PostEdit />} />
            <Route path="/edit/:id" element={<PostEdit />} /> // EDIT ROUTE
            <Route path="/posts/:id" element={<Post />} /> // READ ROUTE
          </Routes>
        </Container>
      </Layout>
      <ScrollToTop />
    </>
  );
}

export default App;