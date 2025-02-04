import request from 'supertest';
import mongoose from 'mongoose';
import { Express } from 'express';
import { createServer } from '../../src/app';
import { mockToken } from '../setup';
import Room from '../../src/models/Room';

let app: Express;

beforeAll(async () => {
  app = await createServer();
});

describe('Room Routes', () => {
  describe('GET /api/rooms', () => {
    it('should return empty array when no rooms exist', async () => {
      const res = await request(app).get('/api/rooms');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it('should return all rooms', async () => {
      // Create a test room
      const room = await Room.create({
        name: 'Test Room',
        capacity: 10,
        equipment_details: 'Test equipment',
      });

      const res = await request(app).get('/api/rooms');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe('Test Room');
    });
  });

  describe('GET /api/rooms/:id', () => {
    it('should return 404 for non-existent room', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/rooms/${id}`);
      expect(res.status).toBe(404);
    });

    it('should return room if exists', async () => {
      const room = await Room.create({
        name: 'Test Room',
        capacity: 10,
        equipment_details: 'Test equipment',
      });

      const res = await request(app).get(`/api/rooms/${room._id}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Room');
    });
  });

  describe('Protected Routes', () => {
    describe('POST /api/rooms', () => {
      const validRoom = {
        name: 'New Room',
        capacity: 20,
        equipment_details: 'New equipment',
      };

      it('should return 401 if no token provided', async () => {
        const res = await request(app)
          .post('/api/rooms')
          .send(validRoom);
        expect(res.status).toBe(401);
      });

      it('should create room with valid data and admin token', async () => {
        const res = await request(app)
          .post('/api/rooms')
          .set('Authorization', `Bearer ${mockToken}`)
          .send(validRoom);
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('New Room');
      });

      it('should validate required fields', async () => {
        const res = await request(app)
          .post('/api/rooms')
          .set('Authorization', `Bearer ${mockToken}`)
          .send({ name: '' }); // Missing required fields
        expect(res.status).toBe(400);
      });
    });

    describe('PUT /api/rooms/:id', () => {
      it('should update room with valid data and admin token', async () => {
        const room = await Room.create({
          name: 'Test Room',
          capacity: 10,
          equipment_details: 'Test equipment',
        });

        const res = await request(app)
          .put(`/api/rooms/${room._id}`)
          .set('Authorization', `Bearer ${mockToken}`)
          .send({ name: 'Updated Room' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Updated Room');
      });

      it('should return 404 for non-existent room', async () => {
        const id = new mongoose.Types.ObjectId();
        const res = await request(app)
          .put(`/api/rooms/${id}`)
          .set('Authorization', `Bearer ${mockToken}`)
          .send({ name: 'Updated Room' });

        expect(res.status).toBe(404);
      });

      it('should validate update data', async () => {
        const room = await Room.create({
          name: 'Test Room',
          capacity: 10,
          equipment_details: 'Test equipment',
        });

        const res = await request(app)
          .put(`/api/rooms/${room._id}`)
          .set('Authorization', `Bearer ${mockToken}`)
          .send({ capacity: -1 }); // Invalid capacity

        expect(res.status).toBe(400);
      });
    });

    describe('DELETE /api/rooms/:id', () => {
      it('should delete existing room with admin token', async () => {
        const room = await Room.create({
          name: 'Test Room',
          capacity: 10,
          equipment_details: 'Test equipment',
        });

        const res = await request(app)
          .delete(`/api/rooms/${room._id}`)
          .set('Authorization', `Bearer ${mockToken}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        // Verify room is deleted
        const deletedRoom = await Room.findById(room._id);
        expect(deletedRoom).toBeNull();
      });

      it('should return 404 for non-existent room', async () => {
        const id = new mongoose.Types.ObjectId();
        const res = await request(app)
          .delete(`/api/rooms/${id}`)
          .set('Authorization', `Bearer ${mockToken}`);

        expect(res.status).toBe(404);
      });
    });
  });
});
