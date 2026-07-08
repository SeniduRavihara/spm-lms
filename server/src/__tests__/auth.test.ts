import request from 'supertest';
import app from '../app';
import { mockPrisma } from '../__mocks__/db';
import bcrypt from 'bcryptjs';

// Tell Jest to use the manual mock of db
jest.mock('../db', () => require('../__mocks__/db'));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    it('should successfully sign up a new user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 'user-id-123',
        email: 'newuser@test.com',
        name: 'New User',
        role: 'student'
      });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'newuser@test.com',
          password: 'password123',
          name: 'New User',
          role: 'student'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toEqual({
        id: 'user-id-123',
        email: 'newuser@test.com',
        name: 'New User',
        role: 'student'
      });
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'newuser@test.com' } });
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('should return 409 if email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-id',
        email: 'existing@test.com'
      });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'existing@test.com',
          password: 'password123',
          name: 'Existing',
          role: 'student'
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toBe('Email already in use');
    });

    it('should return 400 if fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'missing@test.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('All fields are required');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in successfully with valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id-123',
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'student'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@test.com');
    });

    it('should return 401 with invalid password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-id-123',
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'student'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });
  });
});
