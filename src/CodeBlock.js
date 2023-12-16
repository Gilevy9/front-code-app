import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

import './AppStyles.css';

const CodeBlock = () => {
  const { blockName } = useParams(); // Extract blockName from URL parameters
  const [code, setCode] = useState('');
  const socket = io('http://localhost:3000');
  const [isMentor, setIsMentor] = useState(false);

  // Function to handle code change events from CodeMirror
  const handleCodeChange = useCallback((editor, data, value) => {
    socket.emit('codeUpdate', { title: blockName, code: value });
  }, [blockName, socket]);

  useEffect(() => {
    socket.emit('requestCode', blockName);
    socket.emit('checkRole', blockName);

    socket.on('roleAssigned', (role) => {
        setIsMentor(role === 'mentor');
      });
    // Function to handle code updates
    const handleCodeUpdate = (data) => {
      if (data.title === blockName) {
        setCode(data.code);
      }
    };


    socket.on('codeUpdate', handleCodeUpdate);

    // Cleanup function
    return () => {
      socket.off('codeUpdate', handleCodeUpdate);

    };

  }, []);

  return (
    <div className="container">
      <h1 className="title">{blockName}</h1>
      <CodeMirror
        className='code-editor-container'
        value={code}
        onBeforeChange={(editor, data, value) => {
          if (!isMentor) {
            setCode(value);
          }
        }}
        onChange={handleCodeChange}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
          readOnly: isMentor // Disable editing for mentor
        }}
      />
    </div>
  );
};

export default CodeBlock;