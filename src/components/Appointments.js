import React, {useEffect, useState} from 'react';
import { get, post, del } from '../api';
import { format } from 'date-fns';

export default function Appointments(){
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');

  useEffect(()=>{ fetchAll(); }, []);

  async function fetchAll(){
    const [appts, pats, docs] = await Promise.all([ get('/appointments'), get('/patients'), get('/doctors') ]);
    setAppointments(appts || []);
    setPatients(pats || []);
    setDoctors(docs || []);
  }

  async function book(e){
    e.preventDefault();
    await post('/appointments', { patientId: parseInt(patientId,10), doctorId: parseInt(doctorId,10), date });
    setPatientId(''); setDoctorId(''); setDate('');
    fetchAll();
  }

  async function cancel(id){
    if(!window.confirm('Cancel appointment?')) return;
    await del('/appointments/' + id);
    fetchAll();
  }

  return (
    <div style={{marginTop:12}}>
      <h3>Appointments</h3>
      <form onSubmit={book} className="card">
        <select value={patientId} onChange={e=>setPatientId(e.target.value)} required>
          <option value="">Select patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={doctorId} onChange={e=>setDoctorId(e.target.value)} required>
          <option value="">Select doctor</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
        </select>
        <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} required />
        <button type="submit">Book Appointment</button>
      </form>

      {appointments.map(a => (
        <div key={a.id} className="card">
          <div><strong>{a.patientName || a.patientId}</strong> with <strong>{a.doctorName || a.doctorId}</strong></div>
          <div className="small">{a.date ? format(new Date(a.date), 'PPP p') : a.date}</div>
          <button onClick={()=>cancel(a.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
