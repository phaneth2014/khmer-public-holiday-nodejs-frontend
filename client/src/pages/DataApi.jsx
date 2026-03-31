import React from "react";

import CodeBlock from "../components/CodeBlock";

export default function DataApi() {
  const now = new Date();
  const codeSnippet = `
  async function getHoliday (){
    const res = await fetch("https://khmer-calendar.netlify.app/api/holidays")
      .then(res => res.json())
      .then(data => console.log(data));
  }`;
  const api_url = `GET https://khmer-calendar.netlify.app/api/holidays`;
  const api_param = `https://khmer-calendar.netlify.app/api/holidays?year=${now.getFullYear()+1}`;
  
  const holiday = `
  {
    "year": ${now.getFullYear()+1},
    "holidays": [
      {
        "date":"${now.getFullYear()+1}-01-01",
        "description":"បុណ្យចូលឆ្នាំសាកល International New Year's Day"
      },
      {
        "date":"${now.getFullYear()+1}-04-14",
        "description":"បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
      },
      {
        "date":"${now.getFullYear()+1}-04-15",
        "description":"បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
      },
      {
        "date":"${now.getFullYear()+1}-04-16",
        "description":"បុណ្យចូលឆ្នាំប្រពៃណីខ្មែរ (Khmer New Year's Day)"
      }
    ]
  }`;
  const exchange =`
  {
    "date": "2026-03-23",
    "currency": "KHR",
    "exchange_rates": {
      "USD": 4100,
      "EUR": 4450,
      "THB": 120
    },
    "source": "National Bank of Cambodia"
  }`;
  const exchange_month = `https://khmer-calendar.netlify.app/api/exchange-rate?month=3&year=2026`;
  const guideline = `
  async function getHoliday (){
    try{
      const res = await fetch("https://khmer-calendar.netlify.app/api/holidays");
      if (!response.ok) {
        throw new Error('HTTP error! status:'+ response.status );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch failed:", error.message);
      return null; // Return a safe fallback value
    }
  }
  `;
  const guidelinePhp = `
<?php

use Illuminate\\Support\\Facades\\Http;

public function getHoliday(Request $req)
{
  $promise = Http::async()->withoutVerifying()->get('https://khmer-calendar.netlify.app/api/holidays');
  $res = $promise->wait(); // Wait and get the response when ready
  dd($res); //check output
}
`;

  return (
    <section>
      <header>
        <h4>Khmer Calendar app Holiday API</h4>
        <p>សេវា API សម្រាប់ថ្ងៃឈប់សម្រាក និងអត្រាប្តូរប្រាក់រៀលកម្ពុជា</p>
      </header>

      <div className="container">
        <div>
          <h4>Authentication</h4>
          <p>API មិនទាមទារការចូលប្រើដោយ Token។ អាចប្រើបានភ្លាមៗ។</p>
        </div>

        <h4>Endpoints</h4>
        <p> Public Holidays ថ្ងៃឈប់សម្រាកប្រចាំឆ្នាំ</p>
        <div>
          <CodeBlock code={api_url} language={"javascript"} />
        </div>
        <div>
          <p>
            <strong>ទាញយកថ្ងៃឈប់សម្រាកជាតិប្រចាំឆ្នាំ សម្រាប់ឆ្នាំបច្ចុប្បន្ន</strong> 
          </p>
          <p>
            <strong>Parameters:  year (optional) ប្រសិនបើលោកអ្នកចង់ទាញយក ប្រចាំឆ្នាំនីមួយៗ លោកគ្រាន់តែផ្លាស់ប្តូរឆ្នាំដូចឩទាហរណ៍ខាងក្រោមៈ</strong>           
          </p>
          <div>
            <CodeBlock code={api_param} language={"javascript"} /> 
          </div>
          <div>
            <div>ចម្លង URL ខាងលើទៅក្នុងកម្មវិធីរុករកបណ្ដាញណាមួយរបស់អ្នក វានឹងបង្ហាញលទ្ធផលជា data [Object] ដូចខាងក្រោម</div>
            <CodeBlock code={holiday} language={"javascript"} /> 
          </div>
          <h4>Exchange Rate</h4>
          <div>
            <CodeBlock code={exchange} language="javascript" />
          </div>

          <p>
            <strong>Description:</strong> ទាញយកអត្រាប្តូរប្រាក់រៀលកម្ពុជា សម្រាប់ថ្ងៃណាមួយ ឬប្រចាំខែណាមួយ។ ប្រសិនបើអ្នកចង់ទាញយកអត្រាប្តូរប្រាក់រៀលកម្ពុជា សម្រាប់ថ្ងៃណាមួយ អ្នកអាចប្រើ URL ខាងក្រោមនេះបាន៖
          </p>
          <div> <CodeBlock code={exchange_month} language={"javascript"} /></div>
      

          <strong>Parameters: year=2026</strong>
          <div><CodeBlock code={exchange} language={"javascript"} /></div>
          
        </div>

        <div>
          <h4>Rate Limit</h4>
          <p>Unlimited requests (Free Access)</p>

          <CodeBlock code={guideline} language={"javascript"}/>
        </div>

        <div>
          <h4>Usage Guide</h4>
          <h4>Javascript, ReactJS, VueJs, ValinaJs, AgolaJS...</h4>
          <CodeBlock code={codeSnippet} language={"javascript"} />

          <h4>Laravel PHP</h4>
          <CodeBlock code={guidelinePhp} language={"php"} />

        </div>

        <div>
          <h4>Support</h4>
          <p>
            <i className="bi bi-envelope"></i> phaneth2014@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
