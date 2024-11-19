import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

const PostForm = ({user, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [vulnerabilityTitle, setVulnerabilityTitle] = useState('');
  const [vulnerabilityExplanation, setVulnerabilityExplanation] = useState('');
  const [vulnerabilityCode, setVulnerabilityCode] = useState('');
  const [vulnerabilityCodeLang, setVulnerabilityCodeLang] = useState('javascript');
  const [vulnerabilityOutput, setVulnerabilityOutput] = useState('');
  const [mitigationExplanation, setMitigationExplanation] = useState('');
  const [mitigationCode, setMitigationCode] = useState('');
  const [mitigationCodeLang, setMitigationCodeLang] = useState('javascript');
  const [mitigationOutput, setMitigationOutput] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You need to be logged in to create a post.');
      return;
    }
    const newPost = { title, vulnerabilityTitle, vulnerabilityExplanation, vulnerabilityCode, vulnerabilityCodeLang, vulnerabilityOutput, mitigationExplanation, mitigationCode, mitigationCodeLang, mitigationOutput, image };
    try {
    const createdPost = await createPost(newPost);
    onPostCreated(createdPost);
    setTitle('');
    setVulnerabilityTitle('');
    setVulnerabilityExplanation('');
    setVulnerabilityCode('');
    setVulnerabilityOutput('');
    setMitigationExplanation('');
    setMitigationCode('');
    setMitigationOutput('');
    setImage('');
    navigate('/');
  } catch (error) {
    console.error('Error creating post:', error);
  }
  };

  return (
    <div className="new-post-page">
    <h1>Create New Post</h1>
    <form className="post-form" onSubmit={handleSubmit}>
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
      />
      <textarea
        value={vulnerabilityCode}
        onChange={(e) => setVulnerabilityCode(e.target.value)}
        placeholder="Vulnerability Code"
      />
      <select value={vulnerabilityCodeLang} onChange={(e) => setVulnerabilityCodeLang(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        {/* Add more language options if needed */}
      </select>
      <textarea
        value={vulnerabilityOutput}
        onChange={(e) => setVulnerabilityOutput(e.target.value)}
        placeholder="Vulnerability Output"
      />
      <textarea
        value={mitigationExplanation}
        onChange={(e) => setMitigationExplanation(e.target.value)}
        placeholder="Mitigation Explanation"
      />
      <textarea
        value={mitigationCode}
        onChange={(e) => setMitigationCode(e.target.value)}
        placeholder="Mitigation Code"
      />
      <select value={mitigationCodeLang} onChange={(e) => setMitigationCodeLang(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        {/* Add more language options if needed */}
      </select>
      <textarea
        value={mitigationOutput}
        onChange={(e) => setMitigationOutput(e.target.value)}
        placeholder="Mitigation Output"
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

export default PostForm;