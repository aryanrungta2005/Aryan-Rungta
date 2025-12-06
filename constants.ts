import { Envelope, Goal, SpendingCategory, Pod, Confession, Notification } from './types';

export const MOCK_ENVELOPES: Envelope[] = [
  { id: '1', name: 'Needs', amount: 450, total: 800, icon: 'home', color: 'bg-zinc-500', type: 'needs' },
];

export const MOCK_CATEGORIES: SpendingCategory[] = [
  { id: 'c1', name: 'Food & Dining', amount: 850, percent: 35, color: 'text-orange-400', bg: 'bg-orange-500/10', icon: 'pizza' },
  { id: 'c2', name: 'Essentials', amount: 420, percent: 18, color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: 'shopping-cart' },
  { id: 'c3', name: 'Health & Glow', amount: 380, percent: 15, color: 'text-pink-400', bg: 'bg-pink-500/10', icon: 'sparkles' },
  { id: 'c4', name: 'Travel', amount: 200, percent: 8, color: 'text-blue-400', bg: 'bg-blue-500/10', icon: 'car' },
  { id: 'c5', name: 'Miscellaneous', amount: 150, percent: 6, color: 'text-violet-400', bg: 'bg-violet-500/10', icon: 'layers' },
  { id: 'c6', name: 'Academic', amount: 100, percent: 4, color: 'text-teal-400', bg: 'bg-teal-500/10', icon: 'book' },
];

export const MOCK_GOALS: Goal[] = [
  { 
    id: 'g1', 
    name: 'MacBook Pro', 
    current: 12750, 
    target: 45000, 
    daysLeft: 352,
    locked: true,
    status: 'behind',
    weeklySave: 750,
    milestones: ['25% Saved']
  },
  { 
    id: 'g2', 
    name: 'Goa Trip', 
    current: 4200, 
    target: 12000, 
    daysLeft: 540,
    locked: true,
    status: 'active',
    weeklySave: 400,
    milestones: ['Flights Booked']
  }
];

export const MOCK_PODS: Pod[] = [
  {
    id: 'p1',
    title: 'Room 304 Rent',
    members: 4,
    type: 'split',
    totalAmount: 4000,
    userAmount: 1000,
    userStatus: 'You owe',
    actionRequired: true
  },
  {
    id: 'p2',
    title: 'Goa 2025',
    members: 5,
    type: 'saving',
    targetAmount: 60000,
    savedAmount: 11100,
    userAmount: 2500,
    actionRequired: false
  }
];

export const MOCK_CONFESSIONS: Confession[] = [
  {
    id: '1',
    text: "I told my friends I was busy working, but I was actually binge-watching Netflix because I didn't want to spend money on drinks.",
    likes: 24,
    timestamp: '2 hours ago',
    tags: ['#saving', '#introvert']
  },
  {
    id: '2',
    text: "I bought a gym membership in January and haven't been back since the first week. It's still auto-debiting.",
    likes: 45,
    timestamp: '5 hours ago',
    tags: ['#regret', '#subscriptions']
  },
  {
    id: '3',
    text: "I ate instant noodles for dinner all week so I could afford the new sneakers drop.",
    likes: 12,
    timestamp: '1 day ago',
    tags: ['#priorities', '#sneakers']
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Rent Goal Reached!', message: 'You have successfully secured ₹4,000 for rent.', time: '2m ago', read: false, type: 'success' },
  { id: '2', title: 'Spending Alert', message: 'You have used 80% of your weekly food budget.', time: '1h ago', read: false, type: 'alert' },
  { id: '3', title: 'New Pod Invite', message: 'Rohit invited you to join "Goa Trip" pod.', time: '3h ago', read: true, type: 'info' },
  { id: '4', title: 'Bill Split Settle', message: 'Sarah paid you ₹250 for "Friday Dinner".', time: '1d ago', read: true, type: 'success' },
  { id: '5', title: 'Weekly Report', message: 'Your weekly spending analysis is ready.', time: '2d ago', read: true, type: 'info' }
];