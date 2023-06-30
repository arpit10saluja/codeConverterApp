import React, { useState } from 'react';
import './App.css';

function App() {
  const [codeInput, setCodeInput] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isLoading, setloading]=useState(false)

  const handleCodeInputChange = (event) => {
    setCodeInput(event.target.value);
  };
  const handleConversion = () => {
  
    setloading(true);

    fetch(`https://tan-odd-lizard.cyclic.app/converter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, language: selectedLanguage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloading(false);
        console.log(data.codes);
        setConvertedCode(data.codes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDebug = () => {
  
    setloading(true);

    fetch(`https://tan-odd-lizard.cyclic.app/debugger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, language: selectedLanguage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloading(false);
        console.log(data.response);
        setConvertedCode(data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckCode = () => {
  
    setloading(true);

    fetch(`https://tan-odd-lizard.cyclic.app/checkcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput, language: selectedLanguage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloading(false);
        console.log(data.response);
        setConvertedCode(data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
 

  return (
    <div className="app-container">
      <h1>Code Converter App</h1>
        <div className="conversion-container">
          <h2>Conversion Options</h2>
          <div className="conversion-buttons">
            <select onChange={(e)=>setSelectedLanguage(e.target.value)}>
              <option>Select Language</option>
              <option value={"Javascript"}>Javascript</option>
              <option value={"Python"}>Python</option>
              <option value={"C++"}>C++</option>
              <option value={"Java"}>Java</option>

            </select>
            <button onClick={() => handleConversion('convert')}>Convert</button>
            <button onClick={() => handleDebug('debug')}>Debug</button>
            <button onClick={() => handleCheckCode('check')}>Check Quality</button>
          </div>
        </div>
      <div className="container">
        <div className="editor-container">
          <h2>Code Editor</h2>
          <textarea
            value={codeInput}
            onChange={handleCodeInputChange}
            placeholder="Enter your code here..."
          ></textarea>
        </div>
        <div className="output-container">
          <h2>Output</h2>
          {isLoading?<h2>Loading...</h2>:<pre>{convertedCode}</pre>}
        </div>
      </div>
    </div>
  );
}

export default App;
