
import { DTHPart, SupportTicket } from './types';

export const DTH_PARTS: DTHPart[] = [
  {
    id: '1',
    name: 'Satellite Antenna Dish',
    category: 'Hardware',
    description: 'High-gain 60cm offset dish for superior signal reception even in rainy weather.',
    cost: 850,
    imageUrl: 'https://picsum.photos/seed/dish/400/300',
    stock: 45
  },
  {
    id: '2',
    name: 'Standard Remote Control',
    category: 'Accessory',
    description: 'Original Sun Direct remote with ergonomic design and durable buttons.',
    cost: 249,
    imageUrl: 'https://picsum.photos/seed/remote/400/300',
    stock: 120
  },
  {
    id: '3',
    name: 'Universal Remote Control',
    category: 'Accessory',
    description: 'Control both your TV and Sun Direct STB with a single smart remote.',
    cost: 499,
    imageUrl: 'https://picsum.photos/seed/uremote/400/300',
    stock: 85
  },
  {
    id: '4',
    name: 'RG6 Coaxial Cable (30m)',
    category: 'Wiring',
    description: 'Low-loss shielded cable for crystal clear signal transmission from dish to STB.',
    cost: 450,
    imageUrl: 'https://picsum.photos/seed/cable/400/300',
    stock: 200
  },
  {
    id: '5',
    name: 'Dual LNB (Signal Receiver)',
    category: 'Hardware',
    description: 'High-performance Low Noise Block downconverter for stable signal lock.',
    cost: 599,
    imageUrl: 'https://picsum.photos/seed/lnb/400/300',
    stock: 30
  },
  {
    id: '6',
    name: '4K Ultra HD STB',
    category: 'Receiver',
    description: 'Next-gen Set-Top Box supporting 4K resolution and surround sound.',
    cost: 2999,
    imageUrl: 'https://picsum.photos/seed/stb4k/400/300',
    stock: 15
  },
  {
    id: '7',
    name: 'HDMI 2.1 Cable (1.5m)',
    category: 'Wiring',
    description: 'High-speed HDMI cable for uncompressed digital audio and video.',
    cost: 299,
    imageUrl: 'https://picsum.photos/seed/hdmi/400/300',
    stock: 150
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-101',
    customerName: 'Rajesh Kumar',
    // Added missing customerPhone
    customerPhone: '9985265605',
    // Added missing customerAddress
    customerAddress: 'Secunderabad, Telangana',
    issue: 'Signal lost during light rain',
    status: 'OPEN',
    date: '2023-12-07'
  },
  {
    id: 'TKT-102',
    customerName: 'Priya Sharma',
    // Added missing customerPhone
    customerPhone: '9848012345',
    // Added missing customerAddress
    customerAddress: 'Kukatpally, Hyderabad',
    issue: 'Remote buttons not working',
    // Fixed status: 'IN_PROGRESS' is not a valid TicketStatus
    status: 'ASSIGNED',
    date: '2023-12-06'
  },
  {
    id: 'TKT-103',
    customerName: 'Anita Singh',
    // Added missing customerPhone
    customerPhone: '9123456789',
    // Added missing customerAddress
    customerAddress: 'Banjara Hills, Hyderabad',
    issue: 'STB not powering on',
    status: 'RESOLVED',
    date: '2023-12-05'
  }
];
