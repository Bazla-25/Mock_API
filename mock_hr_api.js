// Mock HR API with expanded in-memory data for attendance and leaves.
// Run: node mock_hr_api.js
const http = require('http');
const { URL } = require('url');

const users = [
  {
    id: "93b99245-7c62-4ca7-b875-d7a15e5edbab",
    name: 'Salah',
    email: 'salah.baig@hazentech.com',
    department: 'Engineering',
    title: 'Head of Department',
    location: 'Lahore'
  },
  {
    id: 'a36e6db9-b134-4b69-a6c8-abd59d0cc9bc',
    name: 'Wajhi',
    email: 'wajhi@hazentech.com',
    department: '',
    title: 'Director',
    location: 'USA'
  },
  {
    id: '91f941cc-5edd-4f08-a014-7a7139dbd214',
    name: 'Muhammad Talha',
    email: 'm.talha@hazentech.com',
    department: 'Software Development',
    title: 'Software Engineer',
    location: 'Lahore'
  },
  {
    id: '453a3e6c-c2b6-4c17-9845-ef1533033a75',
    name: 'Bazla ',
    email: 'bazla.rashid@hazentech.com',
    department: 'Software Developer',
    title: 'AI Engineer',
    location: 'Lahore'
  },
  {
    id: "23d03d81-03b3-4efe-9376-f9535b9cb142",
    name: 'Amir',
    email: 'ali.ahmad@hazentech.com',
    department: 'HR',
    title: 'HR Manager',
    location: 'Lahore'
  },
  {
    id: 'u106',
    name: 'Ali Raza',
    email: 'ali.raza@hazentech.com',
    department: 'Platform',
    title: 'DevOps Engineer',
    location: 'Lahore'
  },
  {
    id: '0a036101-4cf4-4d13-a128-11f5f7b3c573',
    name: 'Babar',
    email: 'babar@hazentech.com',
    department: 'Engineering',
    title: 'Software Engineer',
    location: 'Lahore'
  }
];

const attendance = {
  "salah.baig@hazentech.com": [
    { date: '2025-08-05', status: 'present', checkIn: '09:05', checkOut: '17:40' },
    { date: '2025-08-18', status: 'remote', checkIn: '09:15', checkOut: '17:20' },
    { date: '2025-09-03', status: 'present', checkIn: '09:00', checkOut: '17:35' },
    { date: '2025-09-19', status: 'present', checkIn: '09:10', checkOut: '17:45' },
    { date: '2025-10-14', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-10-15', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-11-02', status: 'remote', checkIn: '09:25', checkOut: '17:10' },
    { date: '2025-11-08', status: 'present', checkIn: '09:12', checkOut: '17:32' },
    { date: '2025-11-21', status: 'present', checkIn: '09:07', checkOut: '17:28' },
    { date: '2025-12-01', status: 'present', checkIn: '09:05', checkOut: '17:30' },
    { date: '2025-12-02', status: 'present', checkIn: '09:04', checkOut: '17:24' },
    { date: '2025-12-03', status: 'remote', checkIn: '09:20', checkOut: '17:05' },
    { date: '2025-12-04', status: 'present', checkIn: '09:08', checkOut: '17:32' },
    { date: '2025-12-05', status: 'present', checkIn: '09:00', checkOut: '17:25' },
    { date: '2025-12-06', status: 'present', checkIn: '09:06', checkOut: '17:18' },
    { date: '2025-12-07', status: 'remote', checkIn: '09:25', checkOut: '17:15' },
    { date: '2025-12-08', status: 'present', checkIn: '09:03', checkOut: '17:20' },
    { date: '2025-12-09', status: 'present', checkIn: '09:10', checkOut: '17:27' },
    { date: '2025-12-10', status: 'remote', checkIn: '09:18', checkOut: '17:12' },
    { date: '2025-12-11', status: 'present', checkIn: '09:05', checkOut: '17:26' },
    { date: '2025-12-12', status: 'remote', checkIn: '09:20', checkOut: '17:15' },
    { date: '2025-12-13', status: 'present', checkIn: '09:07', checkOut: '17:22' },
    { date: '2025-12-14', status: 'present', checkIn: '09:06', checkOut: '17:21' },
    { date: '2025-12-15', status: 'present', checkIn: '09:09', checkOut: '17:21' },
    { date: '2025-12-16', status: 'remote', checkIn: '09:30', checkOut: '17:08' },
    { date: '2025-12-17', status: 'present', checkIn: '09:05', checkOut: '17:30' },
    { date: '2025-12-18', status: 'present', checkIn: '09:08', checkOut: '17:35' },
    { date: '2025-12-19', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-20', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-21', status: 'leave', checkIn: null, checkOut: null }
  ],

  "wajhi@hazentech.com": [
    { date: '2025-08-06', status: 'present', checkIn: '08:55', checkOut: '17:10' },
    { date: '2025-08-22', status: 'present', checkIn: '09:05', checkOut: '17:25' },
    { date: '2025-09-10', status: 'present', checkIn: '09:00', checkOut: '17:20' },
    { date: '2025-09-24', status: 'remote', checkIn: '09:10', checkOut: '17:00' },
    { date: '2025-10-05', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-10-06', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-11-18', status: 'present', checkIn: '09:05', checkOut: '17:30' },
    { date: '2025-11-25', status: 'present', checkIn: '09:03', checkOut: '17:18' },
    { date: '2025-11-29', status: 'remote', checkIn: '09:15', checkOut: '17:05' },
    { date: '2025-12-01', status: 'present', checkIn: '08:58', checkOut: '17:05' },
    { date: '2025-12-02', status: 'present', checkIn: '09:10', checkOut: '17:20' },
    { date: '2025-12-03', status: 'present', checkIn: '09:04', checkOut: '17:12' },
    { date: '2025-12-04', status: 'remote', checkIn: '09:15', checkOut: '17:00' },
    { date: '2025-12-05', status: 'present', checkIn: '09:00', checkOut: '17:20' },
    { date: '2025-12-06', status: 'remote', checkIn: '09:12', checkOut: '17:05' },
    { date: '2025-12-07', status: 'present', checkIn: '09:05', checkOut: '17:15' },
    { date: '2025-12-08', status: 'present', checkIn: '09:06', checkOut: '17:16' },
    { date: '2025-12-09', status: 'remote', checkIn: '09:12', checkOut: '17:04' },
    { date: '2025-12-10', status: 'present', checkIn: '09:02', checkOut: '17:18' },
    { date: '2025-12-11', status: 'present', checkIn: '09:00', checkOut: '17:18' },
    { date: '2025-12-12', status: 'present', checkIn: '09:03', checkOut: '17:22' },
    { date: '2025-12-13', status: 'remote', checkIn: '09:10', checkOut: '17:05' },
    { date: '2025-12-14', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-15', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-16', status: 'present', checkIn: '09:08', checkOut: '17:24' },
    { date: '2025-12-17', status: 'remote', checkIn: '09:15', checkOut: '17:05' },
    { date: '2025-12-18', status: 'present', checkIn: '09:05', checkOut: '17:30' },
    { date: '2025-12-19', status: 'present', checkIn: '09:04', checkOut: '17:19' },
    { date: '2025-12-20', status: 'present', checkIn: '09:06', checkOut: '17:25' },
    { date: '2025-12-21', status: 'present', checkIn: '09:03', checkOut: '17:22' }
  ],

  "m.talha@hazentech.com": [
    { date: '2025-08-04', status: 'present', checkIn: '09:10', checkOut: '17:30' },
    { date: '2025-08-20', status: 'present', checkIn: '09:00', checkOut: '17:25' },
    { date: '2025-09-02', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-09-16', status: 'present', checkIn: '09:15', checkOut: '17:35' },
    { date: '2025-10-02', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-11-11', status: 'present', checkIn: '09:05', checkOut: '17:20' },
    { date: '2025-11-19', status: 'present', checkIn: '09:02', checkOut: '17:18' },
    { date: '2025-11-27', status: 'remote', checkIn: '09:25', checkOut: '17:12' },
    { date: '2025-12-01', status: 'present', checkIn: '09:05', checkOut: '17:18' },
    { date: '2025-12-02', status: 'present', checkIn: '09:04', checkOut: '17:20' },
    { date: '2025-12-03', status: 'present', checkIn: '09:04', checkOut: '17:19' },
    { date: '2025-12-04', status: 'present', checkIn: '09:06', checkOut: '17:25' },
    { date: '2025-12-05', status: 'remote', checkIn: '09:20', checkOut: '17:10' },
    { date: '2025-12-06', status: 'present', checkIn: '09:00', checkOut: '17:16' },
    { date: '2025-12-07', status: 'present', checkIn: '09:02', checkOut: '17:15' },
    { date: '2025-12-08', status: 'remote', checkIn: '09:25', checkOut: '17:05' },
    { date: '2025-12-09', status: 'present', checkIn: '09:08', checkOut: '17:22' },
    { date: '2025-12-10', status: 'present', checkIn: '09:05', checkOut: '17:19' },
    { date: '2025-12-11', status: 'remote', checkIn: '09:18', checkOut: '17:08' },
    { date: '2025-12-12', status: 'remote', checkIn: '09:25', checkOut: '17:05' },
    { date: '2025-12-13', status: 'present', checkIn: '09:06', checkOut: '17:20' },
    { date: '2025-12-14', status: 'present', checkIn: '09:10', checkOut: '17:24' },
    { date: '2025-12-15', status: 'present', checkIn: '09:09', checkOut: '17:26' },
    { date: '2025-12-16', status: 'present', checkIn: '09:07', checkOut: '17:23' },
    { date: '2025-12-17', status: 'present', checkIn: '09:00', checkOut: '17:25' },
    { date: '2025-12-18', status: 'remote', checkIn: '09:22', checkOut: '17:10' },
    { date: '2025-12-19', status: 'present', checkIn: '09:04', checkOut: '17:18' },
    { date: '2025-12-20', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-21', status: 'leave', checkIn: null, checkOut: null }
  ],

  "bazla.rashid@hazentech.com": [
    { date: '2025-08-01', status: 'present', checkIn: '08:50', checkOut: '17:05' },
    { date: '2025-08-15', status: 'present', checkIn: '08:55', checkOut: '17:10' },
    { date: '2025-09-05', status: 'present', checkIn: '09:00', checkOut: '17:15' },
    { date: '2025-09-26', status: 'present', checkIn: '08:58', checkOut: '17:08' },
    { date: '2025-12-01', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-02', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-03', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-04', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-05', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-06', status: 'present', checkIn: '08:53', checkOut: '17:06' },
    { date: '2025-12-07', status: 'remote', checkIn: '09:05', checkOut: '17:00' },
    { date: '2025-12-08', status: 'present', checkIn: '08:52', checkOut: '17:12' },
    { date: '2025-12-09', status: 'present', checkIn: '08:54', checkOut: '17:12' },
    { date: '2025-12-10', status: 'present', checkIn: '08:56', checkOut: '17:15' },
    { date: '2025-12-11', status: 'remote', checkIn: '09:10', checkOut: '17:05' },
    { date: '2025-12-12', status: 'present', checkIn: '08:55', checkOut: '17:18' },
    { date: '2025-12-13', status: 'present', checkIn: '08:58', checkOut: '17:18' },
    { date: '2025-12-14', status: 'present', checkIn: '09:00', checkOut: '17:20' },
    { date: '2025-12-15', status: 'present', checkIn: '08:57', checkOut: '17:17' },
    { date: '2025-12-16', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-17', status: 'remote', checkIn: '09:12', checkOut: '17:04' },
    { date: '2025-12-18', status: 'present', checkIn: '08:55', checkOut: '17:16' },
    { date: '2025-12-19', status: 'present', checkIn: '08:59', checkOut: '17:21' },
    { date: '2025-12-20', status: 'present', checkIn: '08:57', checkOut: '17:09' },
    { date: '2025-12-21', status: 'remote', checkIn: '09:08', checkOut: '17:03' }
  ],

  "ali.ahmad@hazentech.com": [
    { date: '2025-08-07', status: 'remote', checkIn: '09:30', checkOut: '17:40' },
    { date: '2025-08-21', status: 'present', checkIn: '09:20', checkOut: '17:25' },
    { date: '2025-09-09', status: 'present', checkIn: '09:10', checkOut: '17:30' },
    { date: '2025-09-23', status: 'present', checkIn: '09:05', checkOut: '17:20' },
    { date: '2025-11-10', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-11-11', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-11-19', status: 'present', checkIn: '09:18', checkOut: '17:24' },
    { date: '2025-11-28', status: 'remote', checkIn: '09:32', checkOut: '17:08' },
    { date: '2025-12-01', status: 'present', checkIn: '09:20', checkOut: '17:30' },
    { date: '2025-12-02', status: 'present', checkIn: '09:18', checkOut: '17:28' },
    { date: '2025-12-03', status: 'remote', checkIn: '09:25', checkOut: '17:05' },
    { date: '2025-12-04', status: 'present', checkIn: '09:15', checkOut: '17:32' },
    { date: '2025-12-05', status: 'present', checkIn: '09:16', checkOut: '17:24' },
    { date: '2025-12-06', status: 'present', checkIn: '09:14', checkOut: '17:22' },
    { date: '2025-12-07', status: 'remote', checkIn: '09:30', checkOut: '17:40' },
    { date: '2025-12-08', status: 'present', checkIn: '09:12', checkOut: '17:20' },
    { date: '2025-12-09', status: 'present', checkIn: '09:18', checkOut: '17:25' },
    { date: '2025-12-10', status: 'present', checkIn: '09:15', checkOut: '17:25' },
    { date: '2025-12-11', status: 'remote', checkIn: '09:28', checkOut: '17:10' },
    { date: '2025-12-12', status: 'present', checkIn: '09:18', checkOut: '17:22' },
    { date: '2025-12-13', status: 'remote', checkIn: '09:30', checkOut: '17:10' },
    { date: '2025-12-14', status: 'present', checkIn: '09:16', checkOut: '17:24' },
    { date: '2025-12-15', status: 'present', checkIn: '09:12', checkOut: '17:20' },
    { date: '2025-12-16', status: 'present', checkIn: '09:10', checkOut: '17:18' },
    { date: '2025-12-17', status: 'present', checkIn: '09:11', checkOut: '17:19' },
    { date: '2025-12-18', status: 'present', checkIn: '09:12', checkOut: '17:28' },
    { date: '2025-12-19', status: 'present', checkIn: '09:13', checkOut: '17:21' },
    { date: '2025-12-20', status: 'present', checkIn: '09:14', checkOut: '17:25' },
    { date: '2025-12-21', status: 'leave', checkIn: null, checkOut: null }
  ],

  "ali.raza@hazentech.com": [
    { date: '2025-08-03', status: 'present', checkIn: '08:45', checkOut: '17:30' },
    { date: '2025-08-17', status: 'on-call', checkIn: '10:00', checkOut: '18:00' },
    { date: '2025-09-06', status: 'present', checkIn: '08:55', checkOut: '17:15' },
    { date: '2025-09-27', status: 'remote', checkIn: '09:05', checkOut: '17:05' },
    { date: '2025-10-11', status: 'present', checkIn: '08:50', checkOut: '17:20' },
    { date: '2025-11-22', status: 'present', checkIn: '09:00', checkOut: '17:30' },
    { date: '2025-12-01', status: 'present', checkIn: '08:50', checkOut: '17:22' },
    { date: '2025-12-02', status: 'present', checkIn: '08:48', checkOut: '17:18' },
    { date: '2025-12-03', status: 'present', checkIn: '08:52', checkOut: '17:18' },
    { date: '2025-12-04', status: 'remote', checkIn: '09:05', checkOut: '17:00' },
    { date: '2025-12-05', status: 'present', checkIn: '08:58', checkOut: '17:20' },
    { date: '2025-12-06', status: 'on-call', checkIn: '10:05', checkOut: '18:05' },
    { date: '2025-12-07', status: 'present', checkIn: '08:54', checkOut: '17:16' },
    { date: '2025-12-08', status: 'present', checkIn: '08:56', checkOut: '17:18' },
    { date: '2025-12-09', status: 'remote', checkIn: '09:10', checkOut: '17:05' },
    { date: '2025-12-10', status: 'present', checkIn: '08:59', checkOut: '17:21' },
    { date: '2025-12-11', status: 'present', checkIn: '08:55', checkOut: '17:22' },
    { date: '2025-12-12', status: 'remote', checkIn: '09:12', checkOut: '17:04' },
    { date: '2025-12-13', status: 'present', checkIn: '08:57', checkOut: '17:19' },
    { date: '2025-12-14', status: 'present', checkIn: '08:55', checkOut: '17:18' },
    { date: '2025-12-15', status: 'present', checkIn: '08:53', checkOut: '17:17' },
    { date: '2025-12-16', status: 'present', checkIn: '08:51', checkOut: '17:16' },
    { date: '2025-12-17', status: 'remote', checkIn: '09:10', checkOut: '17:08' },
    { date: '2025-12-18', status: 'present', checkIn: '08:54', checkOut: '17:20' },
    { date: '2025-12-19', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-20', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-21', status: 'leave', checkIn: null, checkOut: null }
  ],

  'babar@hazentech.com': [
    { date: '2025-08-10', status: 'present', checkIn: '09:10', checkOut: '17:25' },
    { date: '2025-08-24', status: 'present', checkIn: '09:05', checkOut: '17:20' },
    { date: '2025-09-08', status: 'remote', checkIn: '09:18', checkOut: '17:05' },
    { date: '2025-09-22', status: 'present', checkIn: '09:12', checkOut: '17:32' },
    { date: '2025-10-09', status: 'present', checkIn: '09:00', checkOut: '17:22' },
    { date: '2025-10-23', status: 'remote', checkIn: '09:25', checkOut: '17:10' },
    { date: '2025-11-07', status: 'present', checkIn: '09:04', checkOut: '17:18' },
    { date: '2025-11-21', status: 'present', checkIn: '09:06', checkOut: '17:26' },
    { date: '2025-12-01', status: 'present', checkIn: '09:05', checkOut: '17:25' },
    { date: '2025-12-05', status: 'present', checkIn: '09:07', checkOut: '17:24' },
    { date: '2025-12-09', status: 'remote', checkIn: '09:22', checkOut: '17:12' },
    { date: '2025-12-12', status: 'present', checkIn: '09:03', checkOut: '17:21' },
    { date: '2025-12-15', status: 'present', checkIn: '09:01', checkOut: '17:18' },
    { date: '2025-12-18', status: 'present', checkIn: '09:04', checkOut: '17:28' },
    { date: '2025-12-20', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-21', status: 'leave', checkIn: null, checkOut: null },
    { date: '2025-12-22', status: 'leave', checkIn: null, checkOut: null }
  ]
};


const leaves = {
  "salah.baig@hazentech.com": [
    {
      id: 'L-2025-001',
      type: 'vacation',
      startDate: '2025-10-14',
      endDate: '2025-10-15',
      status: 'approved',
      reason: 'Family trip'
    },
    {
      id: 'L-2025-006',
      type: 'work-from-home',
      startDate: '2025-11-02',
      endDate: '2025-11-02',
      status: 'approved',
      reason: 'Utility work at home'
    }
    ,
    {
      id: 'L-2025-010',
      type: 'vacation',
      startDate: '2025-12-19',
      endDate: '2025-12-22',
      status: 'approved',
      reason: 'Year-end break'
    }
  ],

  "wajhi@hazentech.com": [
    {
      id: 'L-2025-002',
      type: 'sick',
      startDate: '2025-10-05',
      endDate: '2025-10-06',
      status: 'approved',
      reason: 'Flu'
    },
    {
      id: 'L-2025-011',
      type: 'casual',
      startDate: '2025-12-14',
      endDate: '2025-12-15',
      status: 'approved',
      reason: 'Family event'
    }
  ],

  "m.talha@hazentech.com": [
    {
      id: 'L-2025-003',
      type: 'sick',
      startDate: '2025-09-02',
      endDate: '2025-09-02',
      status: 'approved',
      reason: 'Migraine'
    },
    {
      id: 'L-2025-008',
      type: 'sick',
      startDate: '2025-10-02',
      endDate: '2025-10-02',
      status: 'approved',
      reason: 'Recurring migraine'
    },
    {
      id: 'L-2025-012',
      type: 'vacation',
      startDate: '2025-12-20',
      endDate: '2025-12-22',
      status: 'approved',
      reason: 'Travel'
    }
  ],

  "bazla.rashid@hazentech.com": [
    {
      id: 'L-2025-004',
      type: 'vacation',
      startDate: '2025-12-01',
      endDate: '2025-12-05',
      status: 'approved',
      reason: 'Annual leave'
    },
    {
      id: 'L-2025-013',
      type: 'sick',
      startDate: '2025-12-16',
      endDate: '2025-12-16',
      status: 'approved',
      reason: 'Flu'
    }
  ],

  "ali.ahmad@hazentech.com": [
    {
      id: 'L-2025-005',
      type: 'training',
      startDate: '2025-11-10',
      endDate: '2025-11-11',
      status: 'approved',
      reason: 'Automation workshop'
    },
    {
      id: 'L-2025-014',
      type: 'vacation',
      startDate: '2025-12-21',
      endDate: '2025-12-22',
      status: 'approved',
      reason: 'Short trip'
    }
  ],

  "ali.raza@hazentech.com": [
    {
      id: 'L-2025-015',
      type: 'on-call',
      startDate: '2025-12-06',
      endDate: '2025-12-06',
      status: 'approved',
      reason: 'Planned rotation'
    },
    {
      id: 'L-2025-016',
      type: 'vacation',
      startDate: '2025-12-19',
      endDate: '2025-12-22',
      status: 'approved',
      reason: 'Family visit'
    }
  ],

  'babar@hazentech.com': [
    {
      id: 'L-2025-017',
      type: 'vacation',
      startDate: '2025-12-20',
      endDate: '2025-12-22',
      status: 'approved',
      reason: 'Family trip'
    }
  ]
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
  let cachedBody = null; // reuse parsed body when needed

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});

  if (segments[0] === 'users') {
    const identifierFromQuery = url.searchParams.get('id') || url.searchParams.get('email');
    let identifier = identifierFromQuery || (segments[1] ? decodeURIComponent(segments[1]) : null);

    // If POST /users/leaves without id/email in path/query, allow body to carry it.
    if (!identifier && segments[1] === 'leaves' && req.method === 'POST') {
      cachedBody = await parseBody(req);
      if (!cachedBody || cachedBody._invalid) {
        return sendJson(res, 400, {
          error: 'Invalid JSON body; expected { startDate, endDate, type?, reason?, userId?|email? }'
        });
      }
      identifier = cachedBody.userId || cachedBody.email || null;
      if (!identifier) {
        return sendJson(res, 400, {
          error: 'userId or email is required (path, query, or body) to apply leave'
        });
      }
    }

    // List all users when no identifier is provided.
    if (!identifier && segments.length === 1 && req.method === 'GET') {
      return sendJson(res, 200, { users });
    }

    const user = users.find((u) => (identifier && (u.id === identifier || u.email === identifier)));
    if (!user) return sendJson(res, 404, { error: 'User not found' });
    const userKey = user.email; // data keyed by email

    // Support query-only lookups (e.g., /users?id=... or /users?email=...)
    if (segments.length === 1 && req.method === 'GET') {
      return sendJson(res, 200, {
        user,
        attendance: attendance[userKey] || [],
        leaves: leaves[userKey] || []
      });
    }

    // Support attendance via query param (e.g., /users/attendance?id=...).
    if (segments[1] === 'attendance' && req.method === 'GET') {
      const month = url.searchParams.get('month'); // YYYY-MM
      let records = attendance[userKey] || [];
      if (month) records = records.filter((r) => r.date.startsWith(month));
      return sendJson(res, 200, { user, attendance: records });
    }

    // Support leaves via query param (e.g., /users/leaves?id=...).
    if (segments[1] === 'leaves') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { user, leaves: leaves[userKey] || [] });
      }
      if (req.method === 'POST') {
        const body = cachedBody || await parseBody(req);
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
        if (!leaves[userKey]) leaves[userKey] = [];
        leaves[userKey].push(newLeave);
        return sendJson(res, 201, { message: 'Leave request submitted', leave: newLeave });
      }
    }

    if (segments.length === 2 && req.method === 'GET') {
      return sendJson(res, 200, {
        user,
        attendance: attendance[userKey] || [],
        leaves: leaves[userKey] || []
      });
    }

    if (segments[2] === 'attendance' && req.method === 'GET') {
      const month = url.searchParams.get('month'); // YYYY-MM
      let records = attendance[userKey] || [];
      if (month) records = records.filter((r) => r.date.startsWith(month));
      return sendJson(res, 200, { user, attendance: records });
    }

    if (segments[2] === 'leaves') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { user, leaves: leaves[userKey] || [] });
      }

      if (req.method === 'POST') {
        const body = await parseBody(req);
        if (!body || body._invalid) {
          return sendJson(res, 400, {
            error: 'Invalid JSON body; expected { startDate, endDate, type?, reason? }'
          });
        }

        const { startDate, endDate, type = 'vacation', reason = 'Not specified', email } = body;
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
          status: 'approved',
          reason,
          requestedOn: new Date().toISOString().slice(0, 10)
        };

        console.log(`newLeave: ${JSON.stringify(newLeave)}, email: ${email}`);

        if (!leaves[email]) leaves[email] = [];
        leaves[email].push(newLeave);
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
