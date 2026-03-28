import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      // Reset the button text after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div
      className="code-block"
      style={{ position: "relative", marginBottom: "20px" }}
    >
      <div className="code-block-header">
        <div>{language}</div>
        <button onClick={handleCopy}>{copied ? <i className="bi bi-clipboard2-check"></i> : <i className="bi bi-copy"></i>}</button>
      </div>

      <div className="code-block-body">
        <SyntaxHighlighter
          language={language}
          style={dracula}
          customStyle={{ padding: "20px", borderRadius: "8px" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
