export interface Envelope {
  id: string;
  name: string;
  amount: number;
  total: number;
  icon: string;
  color: string;
  type: 'needs' | 'wants' | 'savings' | 'locked';
}

export interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  daysLeft: number;
  locked: boolean;
  status: 'active' | 'behind' | 'completed';
  milestones: string[];
  weeklySave: number;
}

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percent: number;
  color: string; // Tailwind text color class
  bg: string;    // Tailwind bg color class
  icon?: string; // Icon name
}

export interface Pod {
  id: string;
  title: string;
  members: number;
  type: 'split' | 'saving';
  totalAmount?: number;
  targetAmount?: number;
  savedAmount?: number;
  userStatus?: string;
  userAmount?: number;
  actionRequired?: boolean;
}

export interface SpendingPoint {
  day: string;
  amount: number;
  
}

export interface Confession {
  id: string;
  text: string;
  likes: number;
  timestamp: string;
  tags: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info';
}