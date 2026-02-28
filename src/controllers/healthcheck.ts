
import { NextFunction, Response } from "express";
import { CustomRequest } from "index";

const SHORT_SHA = process.env.SHORT_SHA

export const getHealtcheck = async (
	req: CustomRequest,
	res: Response,
	_: NextFunction
) => {
	res.json({
		alive: true,
		sha: SHORT_SHA
	});
}