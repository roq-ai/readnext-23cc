import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { contentEngagementValidationSchema } from 'validationSchema/content-engagements';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.content_engagement
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getContentEngagementById();
    case 'PUT':
      return updateContentEngagementById();
    case 'DELETE':
      return deleteContentEngagementById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContentEngagementById() {
    const data = await prisma.content_engagement.findFirst(convertQueryToPrismaUtil(req.query, 'content_engagement'));
    return res.status(200).json(data);
  }

  async function updateContentEngagementById() {
    await contentEngagementValidationSchema.validate(req.body);
    const data = await prisma.content_engagement.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteContentEngagementById() {
    const data = await prisma.content_engagement.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
