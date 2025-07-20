export interface ContactInquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    department: string;
    priority: string;
    status: string;
    message: string;
    dateSubmitted: string;
    assignedTo: string;
    lastUpdated: string;
  }
  
  export interface ContactInfo {
    title: string;
    icon: string;
    value: string;
    description: string;
    color: string;
  }
  
  export interface Office {
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    timezone: string;
  }