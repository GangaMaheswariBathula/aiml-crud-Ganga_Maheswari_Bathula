import React, { useState, useEffect } from 'react';
import api from '../api';

export default function StudentForm({ fetchStudents, selectedStudent, setSelectedStudent }) {
  const [form, setForm] = useState({
    name: '',
    roll_number: '',
    email: '',
    phone_number: '',
    passin_year: '',
    passout_year: ''
  });

 
  useEffect(() => {
    if (selectedStudent) {
      setForm(selectedStudent);
    }
  }, [selectedStudent]);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async e => {
    e.preventDefault();

    
    const formData = {
      ...form,
      passin_year: parseInt(form.passin_year, 10),
      passout_year: parseInt(form.passout_year, 10)
    };

    try {
      if (selectedStudent) {
        await api.put(`students/${selectedStudent.id}/`, formData);
      } else {
        await api.post('students/', formData);
      }

     
      setForm({
        name: '',
        roll_number: '',
        email: '',
        phone_number: '',
        passin_year: '',
        passout_year: ''
      });
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      
      console.error("Error submitting student:", error.response?.data || error.message);

      
      if (error.response && error.response.data) {
        const messages = Object.entries(error.response.data)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('\n');
        alert("Validation errors:\n" + messages);
      } else {
        
        alert("Roll Number and Email must be unique, and all fields are required.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="roll_number"
        value={form.roll_number}
        onChange={handleChange}
        placeholder="Roll Number"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <input
        name="passin_year"
        type="number"
        value={form.passin_year}
        onChange={handleChange}
        placeholder="Passin Year"
        required
      />
      <input
        name="passout_year"
        type="number"
        value={form.passout_year}
        onChange={handleChange}
        placeholder="Passout Year"
        required
      />
      <button type="submit">
        {selectedStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}
