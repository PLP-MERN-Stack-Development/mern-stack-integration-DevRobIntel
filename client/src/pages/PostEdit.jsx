import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext.jsx';
import PostForm from '../components/PostForm.jsx';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addPost, 
    updatePost,
    fetchPostById,
    categories,
    loading: contextLoading,
    error: contextError 
  } = useContext(BlogContext);
  
  const [defaultValues, setDefaultValues] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode] = useState(!!id);

  // AUTO LOAD POST FOR EDITING
  useEffect(() => {
    if (isEditMode && id) {
      loadPostForEdit(id);
    }
  }, [id, isEditMode]);

  const loadPostForEdit = async (postId) => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch post from API
      const post = await fetchPostById(postId);
      
      // AUTO POPULATE FORM with exact values
      setDefaultValues({
        title: post.title || '',
        content: post.content || '',
        category: post.category?._id || '' // Uses category ID
      });
      
      console.log('Loaded post:', post.title); // Debug
    } catch (err) {
      setError('Post not found or failed to load');
      console.error('Load post error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      
      if (isEditMode) {
        // UPDATE existing post
        await updatePost(id, data);
      } else {
        // CREATE new post
        await addPost(data);
      }
      
      // Redirect to home on success
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || (isEditMode ? 'Failed to update post' : 'Failed to create post'));
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner
  if (contextLoading || loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
        <div className="ms-3">Loading {isEditMode ? 'post...' : 'form...'}</div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/')}
          className="me-3"
          disabled={loading}
        >
          <ArrowLeft className="me-1" /> Back
        </Button>
        <h1 className="mb-0">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      {/* Context Error */}
      {contextError && (
        <Alert variant="danger" className="mb-4">
          {contextError}
        </Alert>
      )}

      {/* Form Error */}
      {error && (
        <Alert 
          variant="danger" 
          dismissible 
          onClose={() => setError('')} 
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {/* FORM - Auto populates with defaultValues */}
      <PostForm 
        onSubmit={handleSubmit}
        defaultValues={defaultValues}  // Passes loaded post data
        categories={categories}
        loading={loading}
        isEditMode={isEditMode}
      />
    </Container>
  );
};

export default PostEdit;