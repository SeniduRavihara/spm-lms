import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { generateToken, authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (role !== 'student' && role !== 'teacher') {
    return res.status(400).json({ error: 'Role must be student or teacher' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role }
    });

    const token = generateToken({ userId: user.id, email: user.email, role: user.role as 'student' | 'teacher' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error during signup' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role as 'student' | 'teacher' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error during login' });
  }
});

router.put('/profile', authenticate, async (req: Request, res: Response) => {
  const { name, email, currentPassword, newPassword } = req.body;
  const userId = req.user!.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataToUpdate: any = {};

    if (email && email !== user.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      dataToUpdate.email = email;
    }

    if (name) {
      dataToUpdate.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to set a new password' });
      }
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(401).json({ error: 'Invalid current password' });
      }
      dataToUpdate.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate
    });

    const token = generateToken({ userId: updatedUser.id, email: updatedUser.email, role: updatedUser.role as 'student' | 'teacher' });
    res.json({
      token,
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, role: updatedUser.role }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error during profile update' });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'dev-secret-key-change-in-production') as any;
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/students', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'student' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to list students' });
  }
});

router.post('/students', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const student = await prisma.user.create({
      data: { email, password: hashed, name, role: 'student' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(201).json(student);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to register student' });
  }
});

router.put('/students/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const student = await prisma.user.findFirst({ where: { id, role: 'student' } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (email && email !== student.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      dataToUpdate.email = email;
    }
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update student' });
  }
});

router.delete('/students/:id', authenticate, requireRole('teacher'), async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await prisma.user.findFirst({ where: { id, role: 'student' } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete student' });
  }
});

export default router;
