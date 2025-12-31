
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Fixed: Explicitly cast middleware to any to resolve type mismatch with Express 'PathParams'
app.use(cors() as any);
// Fixed: Explicitly cast middleware to any to resolve type mismatch with Express 'PathParams'
app.use(express.json() as any);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sunsmart_dth';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schemas
const TicketSchema = new mongoose.Schema({
  id: String,
  customerName: String,
  customerPhone: String,
  customerAddress: String,
  issue: String,
  status: String,
  assignedTechnician: String,
  date: String
});

const OrderSchema = new mongoose.Schema({
  id: String,
  trackerId: String,
  items: Array,
  customerName: String,
  customerPhone: String,
  customerAddress: String,
  total: Number,
  deliveryDate: String,
  status: String
});

const Ticket = mongoose.model('Ticket', TicketSchema);
const Order = mongoose.model('Order', OrderSchema);

// Gemini AI Setup (Server Side)
// Fixed: Initialize GoogleGenAI using the exact recommended pattern
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// API Routes
app.post('/api/chat', async (req, res) => {
  const { message, history, systemInstruction } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { systemInstruction, temperature: 0.7 }
    });
    // Fixed: Access the .text property directly from the response object
    res.json({ text: response.text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.find().sort({ date: -1 });
  res.json(tickets);
});

app.post('/api/tickets', async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).json(newTicket);
});

app.patch('/api/tickets/:id', async (req, res) => {
  const updated = await Ticket.findOneAndUpdate({ id: req.params.id }, { status: req.body.status }, { new: true });
  res.json(updated);
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ deliveryDate: -1 });
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

// Serve Frontend (Vite build folder)
// Fixed: Explicitly cast static middleware to any to resolve type mismatch with Express 'PathParams'
app.use(express.static(path.join(__dirname, 'dist')) as any);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
