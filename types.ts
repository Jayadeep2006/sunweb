
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SUPPORT = 'SUPPORT',
  CATALOG = 'CATALOG',
  TECHNICIAN = 'TECHNICIAN',
  CART = 'CART',
  TRACKING = 'TRACKING'
}

export interface DTHPart {
  id: string;
  name: string;
  category: string;
  description: string;
  cost: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem extends DTHPart {
  quantity: number;
}

export type TicketStatus = 'OPEN' | 'ASSIGNED' | 'OUT_FOR_SERVICE' | 'AT_LOCATION' | 'RESOLVED';

export interface SupportTicket {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  issue: string;
  status: TicketStatus;
  assignedTechnician?: string;
  date: string;
}

export interface Order {
  id: string;
  trackerId: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  deliveryDate: string;
  status: 'PROCESSING' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
}

export interface UserActivity {
  id: string;
  timestamp: string;
  type: 'CHAT' | 'FORM' | 'CART' | 'SEARCH';
  content: string;
  label: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
