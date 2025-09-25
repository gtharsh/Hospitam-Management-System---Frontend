const MOCK = true; // set to true to use in-memory mock data (no backend required)
const base = '/api';

let mock = {
  patients: [
    { id: 1, name: 'Asha Kumar', age: 29, phone: '9876543210' },
    { id: 2, name: 'Ravi Patel', age: 45, phone: '9123456780' }
  ],
  doctors: [
    { id: 1, name: 'Dr. Meena Iyer', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Sanjay Rao', specialty: 'Orthopedics' }
  ],
  appointments: []
};

function delay(ms=300){ return new Promise(r=>setTimeout(r,ms)); }

async function request(url, opts){
  if(MOCK){
    await delay(250);
    // basic mock router
    const [_, resource, idOrAction] = url.split('/');
    if(opts?.method === 'GET'){
      if(resource === 'patients') return mock.patients;
      if(resource === 'doctors') return mock.doctors;
      if(resource === 'appointments') return mock.appointments;
    }
    if(opts?.method === 'POST'){
      const body = JSON.parse(opts.body || '{}');
      if(resource === 'patients'){ body.id = Date.now(); mock.patients.push(body); return body; }
      if(resource === 'doctors'){ body.id = Date.now(); mock.doctors.push(body); return body; }
      if(resource === 'appointments'){ body.id = Date.now(); mock.appointments.push(body); return body; }
    }
    if(opts?.method === 'DELETE'){
      if(resource === 'patients'){ mock.patients = mock.patients.filter(p=>p.id != idOrAction); return {}; }
      if(resource === 'doctors'){ mock.doctors = mock.doctors.filter(p=>p.id != idOrAction); return {}; }
      if(resource === 'appointments'){ mock.appointments = mock.appointments.filter(a=>a.id != idOrAction); return {}; }
    }
    return {};
  } else {
    const res = await fetch(base + url, opts);
    if(!res.ok) throw new Error(await res.text());
    if(res.status === 204) return null;
    return res.json();
  }
}

export function get(path){ return request(path, { method: 'GET' }); }
export function post(path, body){ return request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); }
export function del(path){ return request(path, { method: 'DELETE' }); }
