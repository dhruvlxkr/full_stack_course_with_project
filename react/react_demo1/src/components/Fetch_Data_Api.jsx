import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'

const Fetch_Data_Api = () => {

    const [apidata, setapidata] = useState([]);
    useEffect(() => {
        let fetchDataFromApi = async () => {
            let api = await fetch("https://jsonplaceholder.typicode.com/todos");
            let data = await api.json();
            setapidata(data);
            console.log(data);
        }

        fetchDataFromApi();
    }, [])
    
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
        </tr>
      </thead>

      <tbody>
        {apidata.map((data) => (
          <tr key={data.id}>
            <td style={{textAlign:'center'}}>{data.id}</td>
            <td style={{textAlign:'center'}}>{data.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Fetch_Data_Api;