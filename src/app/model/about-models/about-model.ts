export const TIME_LINE_EVENT= [
    {
      date: '2020',
      title: 'Company Founded',
      description: 'PrimeLand was established with a vision to revolutionize digital experiences.',
      icon: 'pi pi-flag',
      color: '#10b981'
    },
    {
      date: '2021',
      title: 'First Major Product Launch',
      description: 'Released our flagship platform serving over 10,000 users.',
      icon: 'pi pi-rocket',
      color: '#3b82f6'
    },
    {
      date: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations to 15 countries across 3 continents.',
      icon: 'pi pi-globe',
      color: '#8b5cf6'
    },
    {
      date: '2023',
      title: 'Innovation Awards',
      description: 'Received multiple industry awards for technological innovation.',
      icon: 'pi pi-trophy',
      color: '#f59e0b'
    },
    {
      date: '2024',
      title: 'Sustainable Future',
      description: 'Committed to carbon-neutral operations and sustainable development.',
      icon: 'pi pi-heart',
      color: '#06d6a0'
    }
  ]

  export const TEAM_MEMBER = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      department: 'Executive',
      experience: 12,
      email: 'sarah.johnson@primeland.com',
      location: 'New York, USA',
      joinDate: '2020-01-15',
      skills: ['Leadership', 'Strategy', 'Business Development']
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      department: 'Technology',
      experience: 10,
      email: 'michael.chen@primeland.com',
      location: 'San Francisco, USA',
      joinDate: '2020-02-01',
      skills: ['System Architecture', 'Cloud Computing', 'AI/ML']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Head of Design',
      department: 'Design',
      experience: 8,
      email: 'emily.rodriguez@primeland.com',
      location: 'London, UK',
      joinDate: '2020-06-15',
      skills: ['UX/UI Design', 'Product Strategy', 'User Research']
    },
    {
      id: 4,
      name: 'David Kumar',
      position: 'Lead Developer',
      department: 'Engineering',
      experience: 7,
      email: 'david.kumar@primeland.com',
      location: 'Bangalore, India',
      joinDate: '2021-03-10',
      skills: ['Angular', 'Node.js', 'Database Design']
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Marketing Director',
      department: 'Marketing',
      experience: 9,
      email: 'lisa.thompson@primeland.com',
      location: 'Toronto, Canada',
      joinDate: '2021-07-20',
      skills: ['Digital Marketing', 'Content Strategy', 'Analytics']
    },
    {
      id: 6,
      name: 'Ahmed Al-Hassan',
      position: 'Product Manager',
      department: 'Product',
      experience: 6,
      email: 'ahmed.hassan@primeland.com',
      location: 'Dubai, UAE',
      joinDate: '2022-01-12',
      skills: ['Product Strategy', 'Agile', 'Data Analysis']
    }
  ]

  export const COLUMNS_DEFS = [
    {
      headerName: 'Avatar',
      field: 'avatar',
      width: 80,
      cellRenderer: (params: any) => {
        return `<div class="flex justify-center">
                  <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    ${params.data.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                </div>`;
      }
    },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Position', field: 'position', sortable: true, filter: true },
    { headerName: 'Department', field: 'department', sortable: true, filter: true },
    { 
      headerName: 'Experience', 
      field: 'experience', 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      valueFormatter: (params: any) => `${params.value} years`
    },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    {
      headerName: 'Join Date',
      field: 'joinDate',
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params: any) => new Date(params.value).toLocaleDateString()
    },
    {
      headerName: 'Skills',
      field: 'skills',
      width: 200,
      cellRenderer: (params: any) => {
        const skills = params.value || [];
        return skills.map((skill: string) => 
          `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${skill}</span>`
        ).join('');
      }
    }
  ]

  export const GRID_OPTION = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    pagination: true,
    paginationPageSize: 10,
    rowHeight: 60
  };
  export const CHART_OPTION = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    }
  }

  export const CHART_DATA =  {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Revenue (Million $)',
        data: [5, 15, 35, 65, 95],
        fill: false,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Users (Thousands)',
        data: [10, 50, 150, 500, 1200],
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  }
  export const STATISTICS = [
    { label: 'Active Users', value: 2.5, unit: 'M+', growth: 25 },
    { label: 'Countries Served', value: 45, unit: '', growth: 30 },
    { label: 'Team Members', value: 250, unit: '+', growth: 40 },
    { label: 'Customer Satisfaction', value: 98, unit: '%', growth: 5 }
  ];