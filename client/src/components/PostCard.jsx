import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pencil, Trash, Eye } from 'react-bootstrap-icons';
import { useContext } from 'react';
import { BlogContext } from '../contexts/BlogContext.jsx';

const PostCard = ({ post }) => {
  const { deletePost } = useContext(BlogContext);

  const handleDelete = () => {
    if (window.confirm('Delete this post?')) {
      deletePost(post._id);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.content.substring(0, 100)}...
        </Card.Text>
        <Link to={`/posts/${post._id}`}>
          <Button variant="primary" className="me-2">
            <Eye className="me-1" /> Read
          </Button>
        </Link>
        <Link to={`/edit/${post._id}`}>
          <Button variant="outline-secondary" className="me-2">
            <Pencil />
          </Button>
        </Link>
        <Button variant="outline-danger" onClick={handleDelete}>
          <Trash />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;