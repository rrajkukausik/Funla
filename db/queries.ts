import { cache } from 'react';
import db from './drizzle';
import { eq } from 'drizzle-orm';
import { courses, userProgress } from './schema';
import { auth } from '@clerk/nextjs/server';

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    //   with: {
    //     units: {
    //       orderBy: (units, { asc }) => [asc(units.order)],
    //       with: {
    //         lessons: {
    //           orderBy: (lessons, { asc }) => [asc(lessons.order)],
    //         },
    //       },
    //     },
    //   },
    });
  
    return data;
  });