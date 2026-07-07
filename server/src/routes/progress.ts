import { Router, Request, Response } from 'express';
import { courses, progress } from '../db';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (req: Request, res: Response) => {
  const userProgress = progress.filter(p => p.userId === req.user!.userId);
  res.json(userProgress);
});

router.get('/:courseId', authenticate, (req: Request, res: Response) => {
  const course = courses.find(c => c.id === req.params.courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const userProgress = progress.filter(
    p => p.userId === req.user!.userId && p.courseId === req.params.courseId
  );
  res.json(userProgress);
});

router.post('/toggle', authenticate, (req: Request, res: Response) => {
  const { lessonId, courseId } = req.body;
  if (!lessonId || !courseId) return res.status(400).json({ error: 'lessonId and courseId are required' });

  const course = courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  if (!course.lessons.find(l => l.id === lessonId)) return res.status(404).json({ error: 'Lesson not found' });

  const existing = progress.find(
    p => p.userId === req.user!.userId && p.lessonId === lessonId && p.courseId === courseId
  );

  if (existing) {
    existing.completed = !existing.completed;
    return res.json(existing);
  }

  const entry = { userId: req.user!.userId, lessonId, courseId, completed: true };
  progress.push(entry);
  res.status(201).json(entry);
});

export default router;
