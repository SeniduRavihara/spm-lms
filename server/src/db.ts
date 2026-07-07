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

  const c3: Course = {
    id: uuid(), title: 'Database Design & SQL', description: 'Master relational databases, entity-relationship modeling, and advanced SQL querying.',
    teacherId, lessons: [
      { id: uuid(), title: 'Relational Database Concepts', courseId: '' },
      { id: uuid(), title: 'Designing Database Schemas', courseId: '' },
      { id: uuid(), title: 'Writing SQL Queries', courseId: '' },
      { id: uuid(), title: 'Joins & Aggregations', courseId: '' },
    ],
  };
  c3.lessons.forEach(l => l.courseId = c3.id);

  const c4: Course = {
    id: uuid(), title: 'Advanced React & State Management', description: 'Deep dive into state management, custom hooks, performance tuning, and React Server Components.',
    teacherId, lessons: [
      { id: uuid(), title: 'React Rendering & Reconciliation', courseId: '' },
      { id: uuid(), title: 'Custom Hooks Patterns', courseId: '' },
      { id: uuid(), title: 'State Management with Zustand', courseId: '' },
      { id: uuid(), title: 'React Server Components (RSC)', courseId: '' },
    ],
  };
  c4.lessons.forEach(l => l.courseId = c4.id);

  const c5: Course = {
    id: uuid(), title: 'Introduction to Cloud Computing', description: 'Learn about virtualization, containerization, serverless architectures, and cloud deployment.',
    teacherId, lessons: [
      { id: uuid(), title: 'Cloud Architecture Fundamentals', courseId: '' },
      { id: uuid(), title: 'Virtual Servers & Containers (Docker)', courseId: '' },
      { id: uuid(), title: 'Serverless Functions', courseId: '' },
      { id: uuid(), title: 'Cloud Monitoring & Auto-Scaling', courseId: '' },
    ],
  };
  c5.lessons.forEach(l => l.courseId = c5.id);

  courses.push(c1, c2, c3, c4, c5);
}

seed();

export { users, courses, progress };
