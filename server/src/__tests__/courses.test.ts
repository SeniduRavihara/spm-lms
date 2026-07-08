import request from 'supertest';
import app from '../app';
import { mockPrisma } from '../__mocks__/db';
import { generateToken } from '../middleware/auth';

jest.mock('../db', () => require('../__mocks__/db'));

const studentHeader = 'Bearer ' + generateToken({ userId: 'student-id', email: 'student@test.com', role: 'student' });
const teacherHeader = 'Bearer ' + generateToken({ userId: 'teacher-id', email: 'teacher@test.com', role: 'teacher' });

describe('Courses Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/courses', () => {
    it('should list all courses', async () => {
      mockPrisma.course.findMany.mockResolvedValue([
        {
          id: 'course-1',
          title: 'Course One',
          description: 'Desc One',
          teacherId: 'teacher-id',
          teacher: { name: 'Teacher One' },
          lessons: [{ id: 'lesson-1' }, { id: 'lesson-2' }]
        }
      ]);

      const res = await request(app)
        .get('/api/courses')
        .set('Authorization', studentHeader);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          id: 'course-1',
          title: 'Course One',
          description: 'Desc One',
          teacherId: 'teacher-id',
          teacherName: 'Teacher One',
          lessonCount: 2
        }
      ]);
    });

    it('should return 401 if unauthorized', async () => {
      const res = await request(app).get('/api/courses');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/courses', () => {
    it('should allow teacher to create a course', async () => {
      mockPrisma.course.create.mockResolvedValue({
        id: 'new-course-id',
        title: 'New Course',
        description: 'New Desc',
        teacherId: 'teacher-id',
        lessons: []
      });

      const res = await request(app)
        .post('/api/courses')
        .set('Authorization', teacherHeader)
        .send({
          title: 'New Course',
          description: 'New Desc'
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: 'new-course-id',
        title: 'New Course',
        description: 'New Desc',
        teacherId: 'teacher-id',
        lessons: []
      });
    });

    it('should block students from creating a course', async () => {
      const res = await request(app)
        .post('/api/courses')
        .set('Authorization', studentHeader)
        .send({
          title: 'New Course'
        });

      expect(res.status).toBe(403);
    });
  });
});
