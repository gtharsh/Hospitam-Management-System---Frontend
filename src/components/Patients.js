import React, {useEffect, useState} from 'react';
import { get, post, del } from '../api';

export default function Patients(){
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){ try{ const data = await get('/patients'); setPatients(data); } catch(e){ console.error(e); } }
  async function add(e){ e.preventDefault(); try{ await post('/patients', {name, age:parseInt(age,10), phone}); setName(''); setAge(''); setPhone(''); fetch(); } catch(e){ alert(e.message); } }
  async function remove(id){ if(!window.confirm('Delete patient?')) return; await del('/patients/' + id); fetch(); }

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={add} className="card">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} type="number" required />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button type="submit">Add Patient</button>
      </form>

      {patients.map(p => (
        <div key={p.id} className="card">
          <strong>{p.name}</strong>
          <div className="small">Age: {p.age} • Phone: {p.phone}</div>
          <button onClick={()=>remove(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
