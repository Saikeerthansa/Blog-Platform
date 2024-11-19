import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

const NewPostPage = ({ user, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [vulnerabilityTitle, setVulnerabilityTitle] = useState('');
  const [vulnerabilityExplanation, setVulnerabilityExplanation] = useState('');
  const [vulnerabilityCode, setVulnerabilityCode] = useState({});
  const [vulnerabilityCodeLang, setVulnerabilityCodeLang] = useState('C');
  const [vulnerabilityOutput, setVulnerabilityOutput] = useState({});
  const [mitigationExplanation, setMitigationExplanation] = useState('');
  const [mitigationCode, setMitigationCode] = useState({});
  const [mitigationCodeLang, setMitigationCodeLang] = useState('C');
  const [mitigationOutput, setMitigationOutput] = useState({});
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (type, language, value) => {
    if (type === 'vulnerabilityCode') {
      setVulnerabilityCode(prev => ({ ...prev, [language]: value }));
    } else if (type === 'vulnerabilityOutput') {
      setVulnerabilityOutput(prev => ({ ...prev, [language]: value }));
    } else if (type === 'mitigationCode') {
      setMitigationCode(prev => ({ ...prev, [language]: value }));
    } else if (type === 'mitigationOutput') {
      setMitigationOutput(prev => ({ ...prev, [language]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You need to be logged in to create a post.');
      return;
    }

    const post = { 
      title, 
      vulnerabilityTitle, 
      vulnerabilityExplanation, 
      vulnerabilityCode, 
      vulnerabilityOutput, 
      mitigationExplanation, 
      mitigationCode, 
      mitigationOutput, 
      image 
    };
    
    try {
      const createdPost = await createPost(post);
      onPostCreated(createdPost);
      setTitle('');
      setVulnerabilityTitle('');
      setVulnerabilityExplanation('');
      setVulnerabilityCode({});
      setVulnerabilityOutput({});
      setMitigationExplanation('');
      setMitigationCode({});
      setMitigationOutput({});
      setImage('');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      alert('Failed to create post: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="new-post-page">
      <form onSubmit={handleSubmit} className="post-form">
      <h1>Create New Post</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={vulnerabilityTitle}
          onChange={(e) => setVulnerabilityTitle(e.target.value)}
          placeholder="Vulnerability Title"
          required
        />
        <textarea
          value={vulnerabilityExplanation}
          onChange={(e) => setVulnerabilityExplanation(e.target.value)}
          placeholder="Vulnerability Explanation"
          required
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <select value={vulnerabilityCodeLang} onChange={(e) => setVulnerabilityCodeLang(e.target.value)}>
          <option value="C">C</option>
          <option value="C++">C++</option>
          {/* Add more language options if needed */}
        </select>
        <textarea
          value={vulnerabilityCode[vulnerabilityCodeLang] || ''}
          onChange={(e) => handleCodeChange('vulnerabilityCode', vulnerabilityCodeLang, e.target.value)}
          placeholder="Vulnerability Code"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <textarea
          value={vulnerabilityOutput[vulnerabilityCodeLang] || ''}
          onChange={(e) => handleCodeChange('vulnerabilityOutput', vulnerabilityCodeLang, e.target.value)}
          placeholder="Vulnerability Output"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <textarea
          value={mitigationExplanation}
          onChange={(e) => setMitigationExplanation(e.target.value)}
          placeholder="Mitigation Explanation"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <select value={mitigationCodeLang} onChange={(e) => setMitigationCodeLang(e.target.value)}>
          <option value="C">C</option>
          <option value="C++">C++</option>
          {/* Add more language options if needed */}
        </select>
        <textarea
          value={mitigationCode[mitigationCodeLang] || ''}
          onChange={(e) => handleCodeChange('mitigationCode', mitigationCodeLang, e.target.value)}
          placeholder="Mitigation Code"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <textarea
          value={mitigationOutput[mitigationCodeLang] || ''}
          onChange={(e) => handleCodeChange('mitigationOutput', mitigationCodeLang, e.target.value)}
          placeholder="Mitigation Output"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPostPage;
