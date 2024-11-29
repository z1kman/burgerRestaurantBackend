import { AuthRequest } from "../types";
import { NextFunction, Response } from "express";
import { prisma } from "../database";
import { AppError } from "../classes/AppError";

export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const lang = req.lang;
    const notifications = await prisma.notification.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        notification_translation: {
          select: {
            description: true,
            language: {
              select: {
                name: true,
              },
            },
          },
          where: {
            language: {
              name: lang as string,
            },
          },
        },
      },
    });

    const flatNotifications = notifications
      .map((notification) => {
        return notification.notification_translation.map((translation) => ({
          id: notification.id,
          description: translation.description,
          language: translation.language.name,
        }));
      })
      .flat();

    res.json(flatNotifications);
  } catch (err) {
    console.error("Error fetching notifications", err);
    return next(new AppError({ message: "Error fetching notifications" }));
  }
};
