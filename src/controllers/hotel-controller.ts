import { AuthenticatedRequest } from "@/middlewares";
import HotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await HotelService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError")    return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === "PaymentRequiredError") return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
export async function getHotelsById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);
  try {
    const hotels = await HotelService.getHotelsRooms(userId, hotelId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) { 
    if (error.name === "UnauthorizedError")    return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === "PaymentRequiredError") return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
