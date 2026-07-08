import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear any existing data
  await prisma.progress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const hashed = await bcrypt.hash('password', 10);
  
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@test.com',
      password: hashed,
      name: 'Teacher One',
      role: 'teacher'
    }
  });

  const _student = await prisma.user.create({
    data: {
      email: 'student@test.com',
      password: hashed,
      name: 'Student One',
      role: 'student'
    }
  });

  const teacherId = teacher.id;

  // Course 1
  await prisma.course.create({
    data: {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming.',
      teacherId,
      lessons: {
        create: [
          { title: 'Variables & Data Types' },
          { title: 'Control Flow' },
          { title: 'Functions' }
        ]
      }
    }
  });

  // Course 2
  await prisma.course.create({
    data: {
      title: 'Web Development Basics',
      description: 'HTML, CSS, and JavaScript fundamentals.',
      teacherId,
      lessons: {
        create: [
          { title: 'HTML Structure' },
          { title: 'CSS Styling' }
        ]
      }
    }
  });

  // Course 3
  await prisma.course.create({
    data: {
      title: 'Database Design & SQL',
      description: 'Master relational databases, entity-relationship modeling, and advanced SQL querying.',
      teacherId,
      lessons: {
        create: [
          { title: 'Relational Database Concepts' },
          { title: 'Designing Database Schemas' },
          { title: 'Writing SQL Queries' },
          { title: 'Joins & Aggregations' }
        ]
      }
    }
  });

  // Course 4
  await prisma.course.create({
    data: {
      title: 'Advanced React & State Management',
      description: 'Deep dive into state management, custom hooks, performance tuning, and React Server Components.',
      teacherId,
      lessons: {
        create: [
          { title: 'React Rendering & Reconciliation' },
          { title: 'Custom Hooks Patterns' },
          { title: 'State Management with Zustand' },
          { title: 'React Server Components (RSC)' }
        ]
      }
    }
  });

  // Course 5
  await prisma.course.create({
    data: {
      title: 'Introduction to Cloud Computing',
      description: 'Learn about virtualization, containerization, serverless architectures, and cloud deployment.',
      teacherId,
      lessons: {
        create: [
          { title: 'Cloud Architecture Fundamentals' },
          { title: 'Virtual Servers & Containers (Docker)' },
          { title: 'Serverless Functions' },
          { title: 'Cloud Monitoring & Auto-Scaling' }
        ]
      }
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
