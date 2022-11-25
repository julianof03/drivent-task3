import { AuthenticatedRequest } from "@/middlewares";
import HotelService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    console.log("cheguei nos controllers");
    const hotels = await HotelService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") { 
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
