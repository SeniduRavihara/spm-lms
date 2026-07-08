import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: { select: { name: true } },
        lessons: { select: { id: true } }
      }
    });

    const list = courses.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      teacherId: c.teacherId,
      teacherName: c.teacher ? c.teacher.name : 'Unknown Instructor',
      lessonCount: c.lessons.length,
    }));
    
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error listing courses' });
  }
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        lessons: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });
    
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error fetching course' });
  }
});

router.post('/', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description: description || '',
        teacherId: req.user!.userId
      },
      include: {
        lessons: true
      }
    });
    res.status(201).json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error creating course' });
  }
});

router.put('/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: req.params.id } });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

    const { title, description } = req.body;
    
    const updated = await prisma.course.update({
      where: { id: req.params.id },
      data: {
        title: title || undefined,
        description: description !== undefined ? description : undefined
      },
      include: {
        lessons: true
      }
    });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error updating course' });
  }
});

router.delete('/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: req.params.id } });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

    await prisma.course.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error deleting course' });
  }
});

export default router;
