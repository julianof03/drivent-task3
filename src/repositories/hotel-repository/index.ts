import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}
async function findRoomByHotelId(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomByHotelId
};

export default hotelRepository;
