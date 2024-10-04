import { AuthRequest } from "../types";
import { handleError } from "../handlers/handleError";
import { Response } from "express";
import { ErrorName } from "../constants/errors";
import { prisma } from "../database";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const lang = req.query.lang;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  try {
    const notifications = await prisma.notification.findMany({
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
    handleError(res, { message: "Error fetching notifications" });
  }
};
