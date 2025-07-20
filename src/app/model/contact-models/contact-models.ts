import { Office } from "../../interfaces/ContactPage"

export const DEPARTMENT_OPTIONS = [
    { label: 'General Inquiry', value: 'general' },
    { label: 'Sales', value: 'sales' },
    { label: 'Technical Support', value: 'support' },
    { label: 'Business Development', value: 'business' },
    { label: 'Careers', value: 'careers' },
    { label: 'Media & Press', value: 'media' }
  ]
  export const CONTACT_INQUERY = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      subject: 'Product Demo Request',
      department: 'sales',
      priority: 'high',
      status: 'open',
      message: 'Interested in scheduling a product demonstration for our team.',
      dateSubmitted: '2024-01-15T10:30:00Z',
      assignedTo: 'Sarah Johnson',
      lastUpdated: '2024-01-15T14:20:00Z'
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      phone: '+1-555-0456',
      subject: 'Technical Integration Question',
      department: 'support',
      priority: 'medium',
      status: 'in-progress',
      message: 'Need help integrating your API with our existing system.',
      dateSubmitted: '2024-01-14T09:15:00Z',
      assignedTo: 'Michael Chen',
      lastUpdated: '2024-01-15T11:45:00Z'
    },
    {
      id: 3,
      name: 'Robert Wilson',
      email: 'r.wilson@startup.io',
      phone: '+1-555-0789',
      subject: 'Partnership Opportunity',
      department: 'business',
      priority: 'high',
      status: 'closed',
      message: 'Exploring potential partnership opportunities between our companies.',
      dateSubmitted: '2024-01-12T16:20:00Z',
      assignedTo: 'Lisa Thompson',
      lastUpdated: '2024-01-14T13:30:00Z'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'maria.garcia@media.com',
      phone: '+1-555-0321',
      subject: 'Press Inquiry',
      department: 'media',
      priority: 'medium',
      status: 'open',
      message: 'Writing an article about innovative tech companies. Would like to interview your CEO.',
      dateSubmitted: '2024-01-13T11:45:00Z',
      assignedTo: 'Ahmed Al-Hassan',
      lastUpdated: '2024-01-13T15:20:00Z'
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david.kim@freelance.com',
      phone: '+1-555-0654',
      subject: 'Career Opportunity',
      department: 'careers',
      priority: 'low',
      status: 'in-progress',
      message: 'Interested in frontend developer positions. Have 5 years of React experience.',
      dateSubmitted: '2024-01-11T14:30:00Z',
      assignedTo: 'Emily Rodriguez',
      lastUpdated: '2024-01-12T10:15:00Z'
    }
  ]

  export const CONTACT_INFO = [
    {
      title: 'Email Us',
      icon: 'pi pi-envelope',
      value: 'contact@primeland.com',
      description: 'Send us an email anytime',
      color: '#3b82f6'
    },
    {
      title: 'Call Us',
      icon: 'pi pi-phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      color: '#10b981'
    },
    {
      title: 'Live Chat',
      icon: 'pi pi-comments',
      value: 'Available 24/7',
      description: 'Get instant support',
      color: '#8b5cf6'
    },
    {
      title: 'Visit Us',
      icon: 'pi pi-map-marker',
      value: '123 Business Ave',
      description: 'New York, NY 10001',
      color: '#f59e0b'
    }
  ]

  export const OFFICE: Office[] = [
    {
      name: 'New York Headquarters',
      address: '123 Business Avenue, Suite 100, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@primeland.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      timezone: 'EST'
    },
    {
      name: 'San Francisco Office',
      address: '456 Tech Street, Floor 12, San Francisco, CA 94102',
      phone: '+1 (555) 987-6543',
      email: 'sf@primeland.com',
      hours: 'Mon-Fri: 9:00 AM - 7:00 PM',
      timezone: 'PST'
    },
    {
      name: 'London Office',
      address: '789 Innovation Road, London EC1A 1BB, United Kingdom',
      phone: '+44 20 7123 4567',
      email: 'london@primeland.com',
      hours: 'Mon-Fri: 9:00 AM - 5:30 PM',
      timezone: 'GMT'
    }
  ]