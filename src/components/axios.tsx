
import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

interface JsonDatainterface {
    userId: number, 
    id: number, 
    title: string, 
    body: string
}

const baseURL = "https://jsonplaceholder.typicode.com/posts";


export default function GetJsonData() {

  const [jsonData, setjsonData] = useState<JsonDatainterface>();

  useEffect(() => {
    axios.get<JsonDatainterface>(`${baseURL}/1`).then((response) => {
      setjsonData(response.data);
    });
  }, []);
  
  return (
    <div>
      <p>тест</p>
      <ul>
        {jsonData.map(item => (<li key={item.id}>{item.title}</li>))}
      </ul>
    </div>
  );
}