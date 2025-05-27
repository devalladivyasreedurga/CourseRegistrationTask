import React from 'react';
import { useState, useEffect } from 'react';


const Student = () => {
    const [courses, setCourses] = useState('');
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [flag,setFlag] = useState(false);
    const [course,setCourse] = useState('');

    useEffect(() => {
         fetchDetails()
      }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // const response = await axios.get('http://localhost:3001/admin', { "name":name, "pass":password });
          const response = await fetch('http://localhost:3001/addStudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  "name":name, "id":id})
          });
          const data = await response.json();
          if (data.message === "yes") {
            alert("added user");
            setFlag(true);
          } else {
            console.log(response);
            alert("invalid");
          }
        } catch (error) {
            setFlag(true);
        }
      };
    const fetchDetails = async () => {
        // const response1 = await fetch('http://localhost:3001/students', {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({  "name":name, "pass":password})
        // });
        const response2 = await fetch('http://localhost:3001/courses', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({  "name":name, "pass":password})
        });

        // const data1 = await response1.json();
        const data2 = await response2.json();
        // setStudents(data1);
        setCourses(data2);
    }
    const onOptionChangeHandler = (event) => {
        setCourse(event.target.value);
        for(let i=0;i<courses.length; i++){
            if(courses[i].title===event.target.value){
                setCourse(courses[i]);
            }
        }
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };
    const handleReg = async (e) => {
        try {
          // const response = await axios.get('http://localhost:3001/admin', { "name":name, "pass":password });
          const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "studentId":id, "courseId":course?.id})
          });
          const data = await response.json();
          if (data.message === "only once") {
            alert("only once");
          } else if(data.message === "yes") {
            alert("registered");
          }
          else{
            alert("invalid");
          }
        } catch (error) {
          console.error('Error ', error);
        }
      };

    return (
       <div>
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
          <label>id </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {flag && <div>
        <select onChange={onOptionChangeHandler}>
                <option>Please choose one course</option>
                {courses.map((option, index) => {
                    return (
                        <option key={index}>
                            {option.title}
                        </option>
                    );
                })}
            </select>
        <button onClick={()=>handleReg()}>Register</button>
        </div>}
       </div>
    )
}

export default Student;