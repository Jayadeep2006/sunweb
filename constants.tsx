
import { DTHPart, SupportTicket } from './types';

export const DTH_PARTS: DTHPart[] = [
  {
    id: '1',
    name: 'Satellite Antenna Dish',
    category: 'Hardware',
    description: 'Original Sun Direct 60cm high-gain offset dish. Weather-shielded blue finish for maximum signal longevity.',
    cost: 850,
    imageUrl: 'https://tiimg.tistatic.com/fp/1/007/882/environment-friendly-wall-mounted-flexible-mild-steel-sun-direct-dish-antenna--830.jpg',
    stock: 45
  },
  {
    id: '2',
    name: 'Sun Direct Remote Control',
    category: 'Accessory',
    description: 'Official Sun HD replacement remote. Universal control capabilities for both TV and STB synchronization.',
    cost: 399,
    imageUrl: 'https://m.media-amazon.com/images/I/511mQ7KGOVL.jpg',
    stock: 120
  },
  {
    id: '3',
    name: 'RG6 Coaxial Cable (30m)',
    category: 'Wiring',
    description: 'Professional grade white shielded RG6 cable. 30-meter roll designed for zero-interference HD signal transmission.',
    cost: 450,
    imageUrl: 'https://rukminim2.flixcart.com/image/480/640/l4ei1e80/electrical-wire/w/1/c/25-meter-coaxial-rg-6-cable-for-all-dth-antenna-compatible-for-original-imagfb76ebsmzhm4.jpeg?q=90',
    stock: 200
  },
  {
    id: '4',
    name: 'Dual LNB Receiver',
    category: 'Hardware',
    description: 'Premium Dual-Output LNB. Supports two independent STB connections from a single antenna dish.',
    cost: 599,
    imageUrl: 'https://m.media-amazon.com/images/I/41U4WYY9vrL._AC_UF1000,1000_QL80_.jpg',
    stock: 30
  },
  {
    id: '5',
    name: '4K Ultra HD STB (HSG200)',
    category: 'Receiver',
    description: 'Next-gen Sun HD Digital Satellite Receiver. Supports 4K Ultra High Definition and Dolby Digital Audio.',
    cost: 1999,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/12/366919090/VE/KW/CZ/94624065/sun-direct-hd-1.jpeg',
    stock: 15
  },
  {
    id: '6',
    name: 'HDMI 2.1 8K Cable (1.5m)',
    category: 'Wiring',
    description: 'Ultra high-speed HDMI 2.1 gold-plated cable. Required for 4K/8K resolution and high-refresh-rate DTH viewing.',
    cost: 299,
    imageUrl: 'https://m.media-amazon.com/images/I/61HTZLb+XWL.jpg',
    stock: 150
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-101',
    customerName: 'Rajesh Kumar',
    customerPhone: '9985265605',
    customerAddress: 'Secunderabad, Telangana',
    issue: 'Signal lost during light rain',
    status: 'OPEN',
    date: '2023-12-07'
  },
  {
    id: 'TKT-102',
    customerName: 'Priya Sharma',
    customerPhone: '9848012345',
    customerAddress: 'Kukatpally, Hyderabad',
    issue: 'Remote buttons not working',
    status: 'ASSIGNED',
    date: '2023-12-06'
  },
  {
    id: 'TKT-103',
    customerName: 'Anita Singh',
    customerPhone: '9123456789',
    customerAddress: 'Banjara Hills, Hyderabad',
    issue: 'STB not powering on',
    status: 'RESOLVED',
    date: '2023-12-05'
  }
];
