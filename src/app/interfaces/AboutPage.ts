export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }
  
  export  interface TeamMember {
    id: number;
    name: string;
    position: string;
    department: string;
    experience: number;
    email: string;
    location: string;
    joinDate: string;
    skills: string[];
  }
  
  export  interface Statistic {
    label: string;
    value: number;
    unit: string;
    growth: number;
  }
  