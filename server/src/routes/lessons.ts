import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { courses } from '../db';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  const { courseId, title } = req.body;
  if (!courseId || !title) return res.status(400).json({ error: 'courseId and title are required' });

  const course = courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

  const lesson = { id: uuid(), title, courseId };
  course.lessons.push(lesson);
  res.status(201).json(lesson);
});

router.put('/:id', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  for (const course of courses) {
    const lesson = course.lessons.find(l => l.id === req.params.id);
    if (lesson) {
      if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });
      lesson.title = title;
      return res.json(lesson);
    }
  }
  res.status(404).json({ error: 'Lesson not found' });
});

router.delete('/:id', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  for (const course of courses) {
    const idx = course.lessons.findIndex(l => l.id === req.params.id);
    if (idx !== -1) {
      if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });
      course.lessons.splice(idx, 1);
      return res.status(204).send();
    }
  }
  res.status(404).json({ error: 'Lesson not found' });
});

export default router;
