import React, { useEffect, useState } from 'react'
import { holidays,converToKhmerMonth, convertToKhmerNumber } from '../services/data-api';

export default function Holiday() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const getData = async ()=>{
      const now = new Date();
      const res = await holidays(now);
      setData(res);
    }

    getData()
  },[])
  return (
<main>
  <ul className='holiday-list' style={{ "width":"100%","padding":"10px" }}>
    {data.map((item,index)=>(
      <li key={index}><div><b>{convertToKhmerNumber(new Date(item.day).getDate())} </b><br/>{converToKhmerMonth(new Date(item.day).getMonth())}</div><div>: {item.desc}</div></li>
    ))}
  </ul>
</main>
    
  )
}
