import request from 'supertest';
import app from '../app';
import { mockPrisma } from '../__mocks__/db';
import { generateToken } from '../middleware/auth';

jest.mock('../db', () => require('../__mocks__/db'));

const teacherHeader = 'Bearer ' + generateToken({ userId: 'teacher-id', email: 'teacher@test.com', role: 'teacher' });
const nonOwnerHeader = 'Bearer ' + generateToken({ userId: 'other-teacher-id', email: 'other@test.com', role: 'teacher' });

describe('Lessons Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/lessons', () => {
    it('should create a lesson if course belongs to teacher', async () => {
      mockPrisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        teacherId: 'teacher-id'
      });
      mockPrisma.lesson.create.mockResolvedValue({
        id: 'lesson-1',
        title: 'New Lesson',
        courseId: 'course-1'
      });

      const res = await request(app)
        .post('/api/lessons')
        .set('Authorization', teacherHeader)
        .send({
          courseId: 'course-1',
          title: 'New Lesson'
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: 'lesson-1',
        title: 'New Lesson',
        courseId: 'course-1'
      });
    });

    it('should block if course belongs to another teacher', async () => {
      mockPrisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        teacherId: 'teacher-id'
      });

      const res = await request(app)
        .post('/api/lessons')
        .set('Authorization', nonOwnerHeader)
        .send({
          courseId: 'course-1',
          title: 'New Lesson'
        });

      expect(res.status).toBe(403);
    });
  });
});
