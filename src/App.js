import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './Lobby';
import CodeBlock from './CodeBlock';
//import 'highlight.js/styles/default.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Lobby />} />
        <Route path="/codeblock/:blockName" element={<CodeBlock />} />
      </Routes>
    </Router>
  );
};

export default App;
