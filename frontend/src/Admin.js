import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState('');
  const [courses, setCourses] = useState('');
  const [reg, setReg] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get('http://localhost:3001/admin', { "name":name, "pass":password });
      const response = await fetch('http://localhost:3001/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": name, "pass": password })
      });
      const data = await response.json();
      if (data.message === "yes") {
        setLoggedIn(true);
      } else {
        console.log(response);
        alert("invalid");
      }
    } catch (error) {
      console.error('Error ', error);
    }
  };
  const fetchDetails = async () => {
    const response1 = await fetch('http://localhost:3001/students', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({  "name":name, "pass":password})
    });
    const response2 = await fetch('http://localhost:3001/courses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({  "name":name, "pass":password})
    });
    const response3 = await fetch('http://localhost:3001/registrations', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({  "name":name, "pass":password})
    });

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    setStudents(data1);
    setCourses(data2);
    setReg(data3);
    console.log(data1, data2);
  }


  return (
    <div>
      {!loggedIn ? <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
        : <div>
          <button onClick={() => fetchDetails()}>fetch</button>
          <div>{courses !== '' && courses?.map((item, index) => (
            <div className="stud" key={index}>
              <p>{item.id}</p>
              <p>{item.title}</p>
              <p>{item.courseDesc}</p>
            </div>
          ))}</div>
          <div>{students != '' && students.map((item, index) => (
            <div className="stud" key={index}>
              <p>{item.id}</p>
              <p>{item.studentName}</p>
              <p>{item.email}</p>
            </div>
          ))}</div>
          <h1>Registrations</h1>
          <table>
           {reg != '' && reg.map((item, index) => (
            <tr className="stud" key={index}>
              <td>{item.id}</td>
              <td>{item.studentName}</td>
              <td>{item.title}</td>
              <td><button>edit</button></td>
              <td><button>delete</button></td>
              {/* <td><button onClick={()=>{handleDelete(id)}}>delete</button></td> */}
            </tr>
          ))}
          </table>
        </div>


      }
    </div>
  )
}

export default Admin;