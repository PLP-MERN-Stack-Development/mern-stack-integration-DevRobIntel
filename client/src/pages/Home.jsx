import { useContext, useEffect } from 'react';
import { BlogContext } from '../contexts/BlogContext.jsx';
import PostCard from '../components/PostCard.jsx';
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';

const Home = () => {
  const { posts, loading, error, currentPage, totalPages, fetchPosts } = useContext(BlogContext);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  if (loading) return <Container className="my-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-5">
      <h1>254 Edition!</h1>
      <Row>
        {posts.map(post => (
          <Col md={6} lg={4} key={post._id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
      
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-5">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </Container>
  );
};

export default Home;