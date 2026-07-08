import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userProgress = await prisma.progress.findMany({
      where: { userId: req.user!.userId }
    });
    res.json(userProgress);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error listing progress' });
  }
});

router.get('/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: req.params.courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const userProgress = await prisma.progress.findMany({
      where: {
        userId: req.user!.userId,
        courseId: req.params.courseId
      }
    });
    res.json(userProgress);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error fetching course progress' });
  }
});

router.post('/toggle', authenticate, async (req: Request, res: Response) => {
  const { lessonId, courseId } = req.body;
  if (!lessonId || !courseId) return res.status(400).json({ error: 'lessonId and courseId are required' });

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: true }
    });
    
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (!course.lessons.find(l => l.id === lessonId)) return res.status(404).json({ error: 'Lesson not found' });

    const existing = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: req.user!.userId,
          lessonId
        }
      }
    });

    if (existing) {
      const updated = await prisma.progress.update({
        where: { id: existing.id },
        data: { completed: !existing.completed }
      });
      return res.json(updated);
    }

    const entry = await prisma.progress.create({
      data: {
        userId: req.user!.userId,
        lessonId,
        courseId,
        completed: true
      }
    });
    res.status(201).json(entry);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error toggling progress' });
  }
});

export default router;
