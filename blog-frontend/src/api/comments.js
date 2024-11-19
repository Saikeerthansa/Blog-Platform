const API_URL = 'http://localhost:5000/api';

export const addComment = async (postId, comment) => {
  const token = localStorage.getItem('token'); // Ensure token is present
  if (!token) {
    throw new Error('No token found');
  }
  
  const response = await fetch(`${API_URL}/posts/${postId}/comment`, { // Fixed template literals
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Fixed token format
    },
    body: JSON.stringify({ text: comment }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to add comment:', errorText);
    throw new Error('Failed to add comment');
  }

  return response.json();
};

export const deleteComment = async (postId, commentId) => {
  console.log('Deleting comment with postId:', postId, 'and commentId:', commentId);
  
  const response = await fetch(`${API_URL}/posts/${postId}/comment/${commentId}`, { // Fixed template literals
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Fixed token format
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to delete comment:', errorText);
    throw new Error('Failed to delete comment');
  }

  return response.json();
};
