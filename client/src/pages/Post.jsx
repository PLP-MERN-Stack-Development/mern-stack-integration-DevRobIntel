import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext.jsx';
import { Container, Spinner, Alert, Card, Button } from 'react-bootstrap';
import { ArrowLeft, Pencil, Trash } from 'react-bootstrap-icons';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    fetchPostById, 
    deletePost, 
    loading, 
    error 
  } = useContext(BlogContext);
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const fetchedPost = await fetchPostById(id);
      setPost(fetchedPost);
    } catch (err) {
      // Handled by context error
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/', { replace: true });
      } catch (err) {
        // Handled by context error
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          Post not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/')}
          className="me-3"
        >
          <ArrowLeft className="me-1" /> Back to Posts
        </Button>
        <Button 
          variant="outline-primary" 
          onClick={() => navigate(`/edit/${id}`)}
          className="me-2"
        >
          <Pencil className="me-1" /> Edit
        </Button>
        <Button 
          variant="outline-danger" 
          onClick={handleDelete}
        >
          <Trash className="me-1" /> Delete
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="fs-1 mb-4">
            {post.title}
          </Card.Title>
          <Card.Text className="mb-3 text-muted">
            Category: {post.category.name}
          </Card.Text>
          <Card.Text className="white-space-pre-wrap">
            {post.content}
          </Card.Text>
          <Card.Text className="text-muted mt-4">
            Created at: {new Date(post.createdAt).toLocaleString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;