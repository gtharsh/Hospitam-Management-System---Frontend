import React, {useState} from 'react';

export default function Pharmacy(){
  const [items, setItems] = useState([
    { id:1, name:'Paracetamol', qty:120 },
    { id:2, name:'Amoxicillin', qty:40 }
  ]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);

  function add(e){ e.preventDefault(); setItems(prev=>[...prev, { id: Date.now(), name, qty: parseInt(qty,10) }]); setName(''); setQty(0); }
  function inc(id){ setItems(prev=>prev.map(i=> i.id===id ? {...i, qty: i.qty+1} : i)); }
  function dec(id){ setItems(prev=>prev.map(i=> i.id===id ? {...i, qty: Math.max(0,i.qty-1)} : i)); }

  return (
    <div>
      <h2>Pharmacy</h2>
      <form onSubmit={add} className="card">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Medicine name" required />
        <input type="number" value={qty} onChange={e=>setQty(e.target.value)} placeholder="Quantity" required />
        <button type="submit">Add Stock</button>
      </form>

      {items.map(it => (
        <div className="card" key={it.id}>
          <strong>{it.name}</strong>
          <div className="small">Stock: {it.qty}</div>
          <button onClick={()=>inc(it.id)}>+1</button>
          <button onClick={()=>dec(it.id)}>-1</button>
        </div>
      ))}
    </div>
  );
}
