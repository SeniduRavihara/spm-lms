import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { courseId, title, videoUrl } = req.body;
  if (!courseId || !title) return res.status(400).json({ error: 'courseId and title are required' });

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

    const lesson = await prisma.lesson.create({
      data: { title, courseId, videoUrl: videoUrl || '' }
    });
    res.status(201).json(lesson);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error creating lesson' });
  }
});

router.put('/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { title, videoUrl } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { course: true }
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    if (lesson.course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

    const updated = await prisma.lesson.update({
      where: { id: req.params.id },
      data: { title, videoUrl: videoUrl !== undefined ? videoUrl : lesson.videoUrl }
    });
    
    // Omit the loaded relation from the response structure to keep it clean
    const responsePayload = {
      id: updated.id,
      title: updated.title,
      videoUrl: updated.videoUrl,
      courseId: updated.courseId
    };
    
    res.json(responsePayload);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error updating lesson' });
  }
});

router.delete('/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { course: true }
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    if (lesson.course.teacherId !== req.user!.userId) return res.status(403).json({ error: 'Not your course' });

    await prisma.lesson.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error deleting lesson' });
  }
});

export default router;
