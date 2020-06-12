using Server.DTOs;
using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CarRateService : ICarRateService
    {
        private CarRateRepository carRateRepository;
        private CarReservationRepository carReservationRepository;
        private CarRepository carRepository;

        public CarRateService(CarRepository carRepository, CarRateRepository carRateRepository, CarReservationRepository carReservationRepository)
        {
            this.carRateRepository = carRateRepository;
            this.carReservationRepository = carReservationRepository;
            this.carRepository = carRepository;
        }

        public async Task<bool> AddCarRate(RateModel rateModel)
        {

            var carReservation = await carReservationRepository.GetCarReservation(rateModel.ReservationId);

            if( CanAddRate(carReservation))
            {
                CarRate carRate = new CarRate()
                {
                    Rate = rateModel.Rate
                };

                carRateRepository.AddCarRate(carRate);
                
                try
                {
                    await carRateRepository.Save();
                }
                catch
                {
                    return false;
                }

                carReservationRepository.UpdateCarReservation(carReservation);
                carReservation.CarRateId = carRate.Id;

                try
                {
                    await carReservationRepository.Save();
                }
                catch
                {
                    return false;
                }
                if(await UpdateCarRate(carReservation.CarId))
                    return true;
            }
            return false;
        }

        private  bool CanAddRate(CarReservation reservation)
        {
            if (reservation == null)
                return false;
            if (reservation.CarRateId == null && reservation.DropOffDate < DateTime.Now)
                return true;
            return false;
        }

        private async Task<bool> UpdateCarRate(int carId)
        {
            var carReservations = await carRateRepository.GetCarRates(carId);
            double avg = carReservations.Average(r => r.Rate);
            var car = await carRepository.GetCarByID(carId);
            car.Rate = avg;
            carRepository.UpdateCar(car);
            try
            {
                await carRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
