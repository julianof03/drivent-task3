import { notFoundError, conflictError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";
import { TicketStatus } from "@prisma/client";

async function getHotels(userId: number) {
  console.log("cheguei nos enrollment");
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError(); 
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(ticket.status === "RESERVED") {
    throw conflictError;
  }
  if (!ticket) {
    throw notFoundError();
  }
  console.log("cheguei nos ticket");
  const Hotels = await hotelRepository.findHotels();
  console.log(Hotels);

  if (!Hotels) {
    throw notFoundError();
  }
  return Hotels;
}

const HotelService = {
  getHotels,
};

export default HotelService;
