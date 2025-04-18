import React, { useState, useEffect } from 'react';
import api from '../api';
import StudentForm from '../components/StudentForm';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchStudents = async () => {
    const { data } = await api.get('students/');
    setStudents(data);
  };

  useEffect(() => { fetchStudents(); }, []);

  return (
    <div className="container">
      <h1>AIML Department Students</h1>
      <StudentForm 
        fetchStudents={fetchStudents}
        selectedStudent={selected}
        setSelectedStudent={setSelected}
      />

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll #</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Passin Year</th>
            <th>Passout Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(stu => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>{stu.roll_number}</td>
              <td>{stu.email}</td>
              <td>{stu.phone_number}</td>
              <td>{stu.passin_year}</td>
              <td>{stu.passout_year}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => setSelected(stu)}
                >Edit</button>
                <button
                  className="btn btn-delete"
                  onClick={() => api.delete(`students/${stu.id}/`).then(fetchStudents)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
