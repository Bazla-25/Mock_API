// Mock HR API with expanded in-memory data for attendance and leaves.
// Run: node mock_hr_api.js
const http = require('http');
const { URL } = require('url');

const users = [
  {
    id: 'u101',
    name: 'Ava Rahman',
    email: 'ava.rahman@hazentech.com',
    department: 'Engineering',
    title: 'Senior Software Engineer',
    location: 'Lahore'
  },
  {
    id: 'u102',
    name: 'Hamza Khan',
    email: 'hamza.khan@hazentech.com',
    department: 'People Operations',
    title: 'HR Business Partner',
    location: 'Karachi'
  },
  {
    id: 'u103',
    name: 'Noor Fatima',
    email: 'noor.fatima@hazentech.com',
    department: 'Finance',
    title: 'Payroll Specialist',
    location: 'Islamabad'
  },
  {
    id: 'u104',
    name: 'Sara Malik',
    email: 'sara.malik@hazentech.com',
    department: 'People Operations',
    title: 'HR Operations Lead',
    location: 'Lahore'
  },
  {
    id: 'u105',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@hazentech.com',
    department: 'Quality Assurance',
    title: 'QA Engineer',
    location: 'Karachi'
  },
  {
    id: 'u106',
    name: 'Ali Raza',
    email: 'ali.raza@hazentech.com',
    department: 'Platform',
    title: 'DevOps Engineer',
    location: 'Islamabad'
  }
];

const attendance = {
  u101: [
    { date: '2024-10-01', status: 'present', checkIn: '09:05', checkOut: '17:45' },
    { date: '2024-10-02', status: 'present', checkIn: '09:12', checkOut: '17:38' },
    { date: '2024-10-03', status: 'remote', checkIn: '09:20', checkOut: '17:10' },
    { date: '2024-10-04', status: 'present', checkIn: '09:00', checkOut: '17:30' },
    { date: '2024-10-07', status: 'present', checkIn: '08:55', checkOut: '17:25' }
  ],
  u102: [
    { date: '2024-10-01', status: 'present', checkIn: '08:55', checkOut: '17:15' },
    { date: '2024-10-02', status: 'present', checkIn: '09:00', checkOut: '17:20' },
    { date: '2024-10-03', status: 'present', checkIn: '09:10', checkOut: '17:22' },
    { date: '2024-10-04', status: 'remote', checkIn: '09:05', checkOut: '17:00' }
  ],
  u103: [
    { date: '2024-10-01', status: 'present', checkIn: '09:10', checkOut: '17:35' },
    { date: '2024-10-02', status: 'leave', checkIn: null, checkOut: null },
    { date: '2024-10-03', status: 'present', checkIn: '09:18', checkOut: '17:32' },
    { date: '2024-10-04', status: 'present', checkIn: '09:05', checkOut: '17:18' }
  ],
  u104: [
    { date: '2024-10-01', status: 'present', checkIn: '08:50', checkOut: '17:10' },
    { date: '2024-10-02', status: 'present', checkIn: '08:55', checkOut: '17:05' },
    { date: '2024-10-03', status: 'present', checkIn: '09:02', checkOut: '17:15' },
    { date: '2024-10-04', status: 'present', checkIn: '08:57', checkOut: '17:08' }
  ],
  u105: [
    { date: '2024-10-01', status: 'remote', checkIn: '09:30', checkOut: '17:40' },
    { date: '2024-10-02', status: 'present', checkIn: '09:20', checkOut: '17:25' },
    { date: '2024-10-03', status: 'present', checkIn: '09:15', checkOut: '17:35' },
    { date: '2024-10-04', status: 'present', checkIn: '09:10', checkOut: '17:20' }
  ],
  u106: [
    { date: '2024-10-01', status: 'present', checkIn: '08:45', checkOut: '17:30' },
    { date: '2024-10-02', status: 'on-call', checkIn: '10:00', checkOut: '18:00' },
    { date: '2024-10-03', status: 'present', checkIn: '08:55', checkOut: '17:10' },
    { date: '2024-10-04', status: 'remote', checkIn: '09:05', checkOut: '17:05' }
  ]
};

const leaves = {
  u101: [
    {
      id: 'L-2024-001',
      type: 'vacation',
      startDate: '2024-10-14',
      endDate: '2024-10-16',
      status: 'approved',
      reason: 'Family trip'
    },
    {
      id: 'L-2024-006',
      type: 'work-from-home',
      startDate: '2024-11-02',
      endDate: '2024-11-02',
      status: 'pending',
      reason: 'Utility work at home'
    }
  ],
  u102: [
    {
      id: 'L-2024-002',
      type: 'sick',
      startDate: '2024-10-05',
      endDate: '2024-10-06',
      status: 'approved',
      reason: 'Flu'
    },
    {
      id: 'L-2024-007',
      type: 'casual',
      startDate: '2024-10-20',
      endDate: '2024-10-21',
      status: 'pending',
      reason: 'Family event'
    }
  ],
  u103: [
    {
      id: 'L-2024-003',
      type: 'sick',
      startDate: '2024-10-02',
      endDate: '2024-10-02',
      status: 'approved',
      reason: 'Migraine'
    }
  ],
  u104: [
    {
      id: 'L-2024-004',
      type: 'vacation',
      startDate: '2024-12-01',
      endDate: '2024-12-05',
      status: 'approved',
      reason: 'Annual leave'
    }
  ],
  u105: [
    {
      id: 'L-2024-005',
      type: 'training',
      startDate: '2024-11-10',
      endDate: '2024-11-12',
      status: 'approved',
      reason: 'Automation workshop'
    }
  ],
  u106: []
};

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload, null, 2));
};

const parseBody = (req) =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        resolve({ _invalid: true, raw: data });
      }
    });
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const segments = url.pathname.split('/').filter(Boolean);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});

  if (segments[0] === 'users') {
    if (segments.length === 1 && req.method === 'GET') {
      return sendJson(res, 200, { users });
    }

    const userId = segments[1];
    const user = users.find((u) => u.id === userId);
    if (!user) return sendJson(res, 404, { error: 'User not found' });

    if (segments.length === 2 && req.method === 'GET') {
      return sendJson(res, 200, {
        user,
        attendance: attendance[userId] || [],
        leaves: leaves[userId] || []
      });
    }

    if (segments[2] === 'attendance' && req.method === 'GET') {
      const month = url.searchParams.get('month'); // YYYY-MM
      let records = attendance[userId] || [];
      if (month) records = records.filter((r) => r.date.startsWith(month));
      return sendJson(res, 200, { user, attendance: records });
    }

    if (segments[2] === 'leaves') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { user, leaves: leaves[userId] || [] });
      }

      if (req.method === 'POST') {
        const body = await parseBody(req);
        if (!body || body._invalid) {
          return sendJson(res, 400, {
            error: 'Invalid JSON body; expected { startDate, endDate, type?, reason? }'
          });
        }

        const { startDate, endDate, type = 'vacation', reason = 'Not specified' } = body;
        if (!startDate || !endDate) {
          return sendJson(res, 400, {
            error: 'startDate and endDate are required (YYYY-MM-DD)'
          });
        }

        const newLeave = {
          id: `L-${Date.now().toString(36).toUpperCase()}`,
          type,
          startDate,
          endDate,
          status: 'pending',
          reason,
          requestedOn: new Date().toISOString().slice(0, 10)
        };

        if (!leaves[userId]) leaves[userId] = [];
        leaves[userId].push(newLeave);
        return sendJson(res, 201, { message: 'Leave request submitted', leave: newLeave });
      }
    }
  }

  return sendJson(res, 404, { error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock HR API running at http://localhost:${PORT}`);
});
