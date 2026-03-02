
import { NextFunction, Response } from "express";
import { CustomRequest } from "index";

const CURRENT_SHA = process.env.CURRENT_SHA

export const getHealtcheck = async (
	req: CustomRequest,
	res: Response,
	_: NextFunction
) => {
	res.json({
		alive: true,
		sha: CURRENT_SHA
	});
}