import { AuthRequest } from "../types";
import { handleError } from "../handlers/handleError";
import { Response } from "express";
import { ErrorName } from "../constants/errors";
import { sequelize } from "../database";
import { QueryTypes, Sequelize } from "sequelize";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const lang = req.query.lang;

  if (!lang) {
    handleError(res, { name: ErrorName.NO_LANGUAGE_ATTRIBUTE });
  }

  try {
    const notifications = await sequelize.query(
      `
    SELECT 
        n.id,
        nt.description
    FROM public.notification n
    LEFT JOIN public.notification_translation nt
	    on nt.notification_id = n.id
    LEFT JOIN public.language lg
	    on lg.id = nt.language_id
    WHERE
	lg.name = '${lang}'
`,
      {
        type: QueryTypes.SELECT, // Указываем тип запроса
      }
    );

    res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications", err);
    handleError(res, { message: "Error fetching notifications" });
  }
};
