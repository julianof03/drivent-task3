import { notFoundError, paymentRequiredError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";

async function getHotels(userId: number) {
  await VerifyEnrollmentAndTicket(userId);

  const Hotels = await hotelRepository.findHotels();

  if (!Hotels) {
    throw notFoundError();
  }
  return Hotels;
}

async function getHotelsRooms(userId: number, hotelId: number) {
  await VerifyEnrollmentAndTicket(userId);

  const Rooms = await hotelRepository.findRoomByHotelId(hotelId);

  if (!Rooms) { 
    throw notFoundError();
  }
  return Rooms;
}

async function VerifyEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment)  throw notFoundError(); 
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(ticket.status === "RESERVED")  throw paymentRequiredError();
  if (ticket.TicketType.includesHotel === false ) throw unauthorizedError();
  if (!ticket)  throw notFoundError();
}

const HotelService = {
  getHotels,
  getHotelsRooms
};

export default HotelService;
