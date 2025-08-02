export const availablePositions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Project Manager',
  'QA Tester',
  'DevOps Engineer',
  'Business Analyst',
  'Scrum Master',
  'Data Analyst'
];

export const mockProjects = [
  {
    id: 1,
    name: 'E-commerce Website',
    description: 'A modern e-commerce platform with React frontend and Node.js backend. Features include product catalog, shopping cart, payment integration, and admin dashboard.',
    positions: [
      { name: 'Frontend Developer', hours: 120 },
      { name: 'Backend Developer', hours: 100 },
      { name: 'UI/UX Designer', hours: 60 }
    ]
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, transaction history, and real-time notifications.',
    positions: [
      { name: 'Full Stack Developer', hours: 200 },
      { name: 'UI/UX Designer', hours: 80 },
      { name: 'QA Tester', hours: 60 }
    ]
  },
  {
    id: 3,
    name: 'CRM System',
    description: 'Customer relationship management system for sales teams with lead tracking, pipeline management, and reporting features.',
    positions: [
      { name: 'Backend Developer', hours: 150 },
      { name: 'Frontend Developer', hours: 100 },
      { name: 'Business Analyst', hours: 40 }
    ]
  }
];

export const mockTimesheets = [
  {
    id: 1,
    projectId: 1,
    employeeName: 'John Smith',
    position: 'Frontend Developer',
    date: '2025-01-15',
    hoursWorked: 8,
    status: 'Approved'
  },
  {
    id: 2,
    projectId: 1,
    employeeName: 'Sarah Johnson',
    position: 'Backend Developer',
    date: '2025-01-15',
    hoursWorked: 7,
    status: 'Pending'
  },
  {
    id: 3,
    projectId: 1,
    employeeName: 'Mike Davis',
    position: 'UI/UX Designer',
    date: '2025-01-15',
    hoursWorked: 6,
    status: 'Approved'
  },
  {
    id: 4,
    projectId: 2,
    employeeName: 'Emma Wilson',
    position: 'Full Stack Developer',
    date: '2025-01-14',
    hoursWorked: 8,
    status: 'Approved'
  },
  {
    id: 5,
    projectId: 2,
    employeeName: 'David Brown',
    position: 'QA Tester',
    date: '2025-01-14',
    hoursWorked: 5,
    status: 'Pending'
  },
  {
    id: 6,
    projectId: 3,
    employeeName: 'Lisa Anderson',
    position: 'Backend Developer',
    date: '2025-01-13',
    hoursWorked: 8,
    status: 'Approved'
  },
  {
    id: 7,
    projectId: 1,
    employeeName: 'John Smith',
    position: 'Frontend Developer',
    date: '2025-01-14',
    hoursWorked: 7,
    status: 'Approved'
  },
  {
    id: 8,
    projectId: 2,
    employeeName: 'Emma Wilson',
    position: 'Full Stack Developer',
    date: '2025-01-13',
    hoursWorked: 8,
    status: 'Rejected'
  }
];