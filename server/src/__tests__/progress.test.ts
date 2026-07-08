import request from 'supertest';
import app from '../app';
import { mockPrisma } from '../__mocks__/db';
import { generateToken } from '../middleware/auth';

jest.mock('../db', () => require('../__mocks__/db'));

const studentHeader = 'Bearer ' + generateToken({ userId: 'student-id', email: 'student@test.com', role: 'student' });

describe('Progress Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/progress', () => {
    it('should list user progress', async () => {
      mockPrisma.progress.findMany.mockResolvedValue([
        {
          userId: 'student-id',
          lessonId: 'lesson-1',
          courseId: 'course-1',
          completed: true
        }
      ]);

      const res = await request(app)
        .get('/api/progress')
        .set('Authorization', studentHeader);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          userId: 'student-id',
          lessonId: 'lesson-1',
          courseId: 'course-1',
          completed: true
        }
      ]);
    });
  });

  describe('POST /api/progress/toggle', () => {
    it('should toggle and return updated progress', async () => {
      mockPrisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        lessons: [{ id: 'lesson-1' }]
      });
      mockPrisma.progress.findUnique.mockResolvedValue({
        id: 'progress-id',
        userId: 'student-id',
        lessonId: 'lesson-1',
        courseId: 'course-1',
        completed: false
      });
      mockPrisma.progress.update.mockResolvedValue({
        id: 'progress-id',
        userId: 'student-id',
        lessonId: 'lesson-1',
        courseId: 'course-1',
        completed: true
      });

      const res = await request(app)
        .post('/api/progress/toggle')
        .set('Authorization', studentHeader)
        .send({
          courseId: 'course-1',
          lessonId: 'lesson-1'
        });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });
  });
});
