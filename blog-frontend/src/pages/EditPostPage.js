import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../api/posts';

const EditPostPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setVulnerabilityTitle(data.vulnerabilityTitle);
        setVulnerabilityExplanation(data.vulnerabilityExplanation);
        setVulnerabilityCode(data.vulnerabilityCode);
        setVulnerabilityOutput(data.vulnerabilityOutput);
        setMitigationExplanation(data.mitigationExplanation);
        setMitigationCode(data.mitigationCode);
        setMitigationOutput(data.mitigationOutput);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

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
    const updatedPost = {
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
      await updatePost(id, updatedPost);
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="edit-post-page">
      <form onSubmit={handleSubmit} className="post-form">
        <h1>Edit Post</h1>
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
        {/* Vulnerability Code Language Selection */}
        <select value={vulnerabilityCodeLang} onChange={(e) => setVulnerabilityCodeLang(e.target.value)}>
          <option value="C">C</option>
          <option value="C++">C++</option>
          {/* Add more language options if needed */}
        </select>
        <textarea
          value={vulnerabilityCode[vulnerabilityCodeLang] || ''}
          onChange={(e) => handleCodeChange('vulnerabilityCode', vulnerabilityCodeLang, e.target.value)}
          placeholder="Vulnerability Code"
        />
        <textarea
          value={vulnerabilityOutput[vulnerabilityCodeLang] || ''}
          onChange={(e) => handleCodeChange('vulnerabilityOutput', vulnerabilityCodeLang, e.target.value)}
          placeholder="Vulnerability Output"
        />
        <textarea
          value={mitigationExplanation}
          onChange={(e) => setMitigationExplanation(e.target.value)}
          placeholder="Mitigation Explanation"
        />
        {/* Mitigation Code Language Selection */}
        <select value={mitigationCodeLang} onChange={(e) => setMitigationCodeLang(e.target.value)}>
          <option value="C">C</option>
          <option value="C++">C++</option>
          {/* Add more language options if needed */}
        </select>
        <textarea
          value={mitigationCode[mitigationCodeLang] || ''}
          onChange={(e) => handleCodeChange('mitigationCode', mitigationCodeLang, e.target.value)}
          placeholder="Mitigation Code"
        />
        <textarea
          value={mitigationOutput[mitigationCodeLang] || ''}
          onChange={(e) => handleCodeChange('mitigationOutput', mitigationCodeLang, e.target.value)}
          placeholder="Mitigation Output"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;
