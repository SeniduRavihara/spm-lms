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
          { title: 'Variables & Data Types', videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8' },
          { title: 'Control Flow', videoUrl: 'https://www.youtube.com/watch?v=2c-T3rN4c7k' },
          { title: 'Functions', videoUrl: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ' }
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
          { title: 'HTML Structure', videoUrl: 'https://www.youtube.com/watch?v=ok-plXXHl_E' },
          { title: 'CSS Styling', videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI' }
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
          { title: 'Relational Database Concepts', videoUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
          { title: 'Designing Database Schemas', videoUrl: 'https://www.youtube.com/watch?v=wR0jg0eQsZA' },
          { title: 'Writing SQL Queries', videoUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
          { title: 'Joins & Aggregations', videoUrl: 'https://www.youtube.com/watch?v=9yeEl15MC1g' }
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
          { title: 'React Rendering & Reconciliation', videoUrl: 'https://www.youtube.com/watch?v=7YhdqIR2Yzo' },
          { title: 'Custom Hooks Patterns', videoUrl: 'https://www.youtube.com/watch?v=J-g9ZJha0y4' },
          { title: 'State Management with Zustand', videoUrl: 'https://www.youtube.com/watch?v=482vW8440_Q' },
          { title: 'React Server Components (RSC)', videoUrl: 'https://www.youtube.com/watch?v=rGPpQdbDbwo' }
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
          { title: 'Cloud Architecture Fundamentals', videoUrl: 'https://www.youtube.com/watch?v=3g8_a5n2Ugw' },
          { title: 'Virtual Servers & Containers (Docker)', videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
          { title: 'Serverless Functions', videoUrl: 'https://www.youtube.com/watch?v=w95B5ax0N7E' },
          { title: 'Cloud Monitoring & Auto-Scaling', videoUrl: 'https://www.youtube.com/watch?v=3M_E2v4B9k8' }
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
