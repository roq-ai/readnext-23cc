import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { spacedRepetitionScheduleValidationSchema } from 'validationSchema/spaced-repetition-schedules';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.spaced_repetition_schedule
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSpacedRepetitionScheduleById();
    case 'PUT':
      return updateSpacedRepetitionScheduleById();
    case 'DELETE':
      return deleteSpacedRepetitionScheduleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSpacedRepetitionScheduleById() {
    const data = await prisma.spaced_repetition_schedule.findFirst(
      convertQueryToPrismaUtil(req.query, 'spaced_repetition_schedule'),
    );
    return res.status(200).json(data);
  }

  async function updateSpacedRepetitionScheduleById() {
    await spacedRepetitionScheduleValidationSchema.validate(req.body);
    const data = await prisma.spaced_repetition_schedule.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSpacedRepetitionScheduleById() {
    const data = await prisma.spaced_repetition_schedule.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
