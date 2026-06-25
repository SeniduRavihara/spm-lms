import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'student' | 'teacher';
}

export interface Lesson {
  id: string;
  title: string;
  courseId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  lessons: Lesson[];
}

export interface Progress {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
}

const users: User[] = [];
const courses: Course[] = [];
const progress: Progress[] = [];

async function seed() {
  const hashed = await bcrypt.hash('password', 10);
  users.push(
    { id: uuid(), email: 'teacher@test.com', password: hashed, name: 'Teacher One', role: 'teacher' },
    { id: uuid(), email: 'student@test.com', password: hashed, name: 'Student One', role: 'student' },
  );

  const teacherId = users[0].id;
  const c1: Course = {
    id: uuid(), title: 'Introduction to Programming', description: 'Learn the basics of programming.',
    teacherId, lessons: [
      { id: uuid(), title: 'Variables & Data Types', courseId: '' },
      { id: uuid(), title: 'Control Flow', courseId: '' },
      { id: uuid(), title: 'Functions', courseId: '' },
    ],
  };
  c1.lessons.forEach(l => l.courseId = c1.id);

  const c2: Course = {
    id: uuid(), title: 'Web Development Basics', description: 'HTML, CSS, and JavaScript fundamentals.',
    teacherId, lessons: [
      { id: uuid(), title: 'HTML Structure', courseId: '' },
      { id: uuid(), title: 'CSS Styling', courseId: '' },
    ],
  };
  c2.lessons.forEach(l => l.courseId = c2.id);

  courses.push(c1, c2);
}

seed();

export { users, courses, progress };
