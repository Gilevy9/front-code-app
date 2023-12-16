import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Lobby.css'; // Import the CSS file

const Lobby = () => {
  const navigate = useNavigate();
  const codeBlocks = ['Async Case', 'Promise Example', 'Event Loop', 'Closure Example'];

  const navigateToCodeBlock = (blockName) => {
    navigate(`/codeblock/${blockName}`);
  };

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Choose Code Block</h1>
      <ul className="lobby-list">
        {codeBlocks.map((block, index) => (
          <li key={index} className="lobby-list-item" onClick={() => navigateToCodeBlock(block)}>
            {block}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;