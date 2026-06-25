import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { courses } from '../db';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (_req: Request, res: Response) => {
  const list = courses.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    teacherId: c.teacherId,
    lessonCount: c.lessons.length,
  }));
  res.json(list);
});

router.get('/:id', authenticate, (req: Request, res: Response) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

router.post('/', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const course = { id: uuid(), title, description: description || '', teacherId: req.user!.userId, lessons: [] };
  courses.push(course);
  res.status(201).json(course);
});

router.put('/:id', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

  const { title, description } = req.body;
  if (title) course.title = title;
  if (description !== undefined) course.description = description;
  res.json(course);
});

router.delete('/:id', authenticate, requireRole('teacher'), (req: Request, res: Response) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });
  if (courses[idx].teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });
  courses.splice(idx, 1);
  res.status(204).send();
});

export default router;
