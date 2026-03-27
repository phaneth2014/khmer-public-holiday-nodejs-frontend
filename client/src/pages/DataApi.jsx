import React from "react";

import CodeDisplay from "../components/CodeDisplay";

export default function DataApi() {
  const codeSnippet = `fetch("https://api.example.com")
  .then(res => res.json())
  .then(data => console.log(data));`;
  const guideline = `import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeDisplay() {
  const codeString = fetch("https://khmer-calendar.netlify.app/api/exchange-rate")
  .then(res => res.json())
  .then(data => console.log(data));

  return (
    <div style={{ padding: '20px' }}>
      <h3>API Fetch Example</h3>
      <SyntaxHighlighter 
        language="javascript" 
        style={dracula}
        showLineNumbers={true}
        customStyle={{ borderRadius: '8px', fontSize: '14px' }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}`;
  return (
    <section>
      <header>
        <h4>📖 Khmer Public Holiday API</h4>
        <p>សេវា API សម្រាប់ថ្ងៃឈប់សម្រាក និងអត្រាប្តូរប្រាក់រៀលកម្ពុជា</p>
      </header>

      <div className="container">
        <div className="card">
          <pre>
            <code className="language-javascript">
              const serverless = require("serverless-http");
            </code>
          </pre>
        </div>
        <div className="card">
          <h4>1. Authentication</h4>
          <p>API មិនទាមទារការចូលប្រើដោយ Token។ អាចប្រើបានភ្លាមៗ។</p>
        </div>

        <div className="card">
          <h4>2. Endpoints</h4>

          <h3>📅 Public Holidays</h3>
          <pre>
            <code className="language-javascript">
              GET https://khmer-calendar.netlify.app/api/holidays
            </code>
          </pre>
          <p>
            <strong>Description:</strong> ទាញយកថ្ងៃឈប់សម្រាកជាតិប្រចាំឆ្នាំ
          </p>
          <p>
            <strong>Parameters:</strong>{" "}
            <code className="language-javascript">year</code> (optional)
          </p>
          <pre>
            <code className="language-javascript"></code>
          </pre>

          <h3>💱 Exchange Rate</h3>
          <pre>
            <code className="language-javascript">
              GET https://khmer-calendar.netlify.app/api/exchange-rate
            </code>
          </pre>
          <p>
            <strong>Description:</strong> ទាញយកអត្រាប្តូរប្រាក់រៀលកម្ពុជា
          </p>
          <p>
            <strong>Parameters:</strong>{" "}
            <code className="language-javascript">date</code> (optional)
          </p>
          <pre>
            <code className="language-javascript"></code>
          </pre>
        </div>

        <div className="card">
          <h4>3. Rate Limit</h4>
          <p>🚀 Unlimited requests (Free Access)</p>

          <CodeDisplay code={guideline} />
        </div>

        <div className="card">
          <h4>4. Usage Guide</h4>
          <pre>
            <code className="language-javascript">
              <CodeDisplay code={codeSnippet} />
            </code>
          </pre>
        </div>

        <div className="card">
          <h4>5. Support</h4>
          <p>📧 phaneth2014@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
