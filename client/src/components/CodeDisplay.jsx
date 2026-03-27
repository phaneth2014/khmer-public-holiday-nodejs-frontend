import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeDisplay({code}) {
  const codeString =`fetch("https://khmer-calendar.netlify.app/api/exchange-rate")
  .then(res => res.json())
  .then(data => console.log(data));`;
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>API Fetch Example</h3>
      <SyntaxHighlighter 
        language="javascript" 
        style={dracula}
        showLineNumbers={true}
        customStyle={{ borderRadius: '8px', fontSize: '14px' }}
      >
        {code || codeString}
      </SyntaxHighlighter>
    </div>
  );
}