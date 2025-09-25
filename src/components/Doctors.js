import React, {useEffect, useState} from 'react';
import { get, post, del } from '../api';

export default function Doctors(){
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){ const data = await get('/doctors'); setDoctors(data || []); }
  async function add(e){ e.preventDefault(); await post('/doctors', { name, specialty }); setName(''); setSpecialty(''); fetch(); }
  async function remove(id){ if(!window.confirm('Delete doctor?')) return; await del('/doctors/' + id); fetch(); }

  return (
    <div style={{marginTop:12}}>
      <h3>Doctors</h3>
      <form onSubmit={add} className="card">
        <input placeholder="Doctor name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Specialty" value={specialty} onChange={e=>setSpecialty(e.target.value)} />
        <button type="submit">Add Doctor</button>
      </form>

      {doctors.map(d => (
        <div key={d.id} className="card">
          <strong>{d.name}</strong>
          <div className="small">{d.specialty}</div>
          <button onClick={()=>remove(d.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
