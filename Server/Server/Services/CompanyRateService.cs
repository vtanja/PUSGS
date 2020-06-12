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
    public class CompanyRateService : ICompanyRateService
    {
        private CompanyRateRepository companyRateRepository;
        private CarReservationRepository carReservationRepository;
        private CarRepository carRepository;
        private RentCarRepository rentCarRepository;

        public CompanyRateService(CarRepository carRepository, RentCarRepository rentCarRepository,CompanyRateRepository companyRateRepository, CarReservationRepository carReservationRepository)
        {
            this.companyRateRepository = companyRateRepository;
            this.carReservationRepository = carReservationRepository;
            this.rentCarRepository = rentCarRepository;
            this.carRepository = carRepository;
        }

        public async Task<bool> AddCompanyRate(RateModel rateModel)
        {
            var carReservation = await carReservationRepository.GetCarReservation(rateModel.ReservationId);
            
            if ( CanAddRate(carReservation))
            {
                var car = await carRepository.GetCarByID(carReservation.CarId);
                CompanyRate companyRate = new CompanyRate()
                {
                    Rate = rateModel.Rate
                };
                companyRateRepository.AddCompanyRate(companyRate);
                try
                {
                    await companyRateRepository.Save();
                }
                catch
                {
                    return false;
                }
                carReservationRepository.UpdateCarReservation(carReservation);
                carReservation.CompanyRateId = companyRate.Id;

                try
                {
                    await carReservationRepository.Save();
                }
                catch
                {
                    return false;
                }

                if (await UpdateCompanyRate(car.CompanyId))
                    return true;
            }
            return false;
        }

        private bool CanAddRate(CarReservation reservation)
        {
            if (reservation == null)
                return false;
            if (reservation.CompanyRateId==null && reservation.DropOffDate<DateTime.Now)
                return true;
            return false;
        }

        private async Task<bool> UpdateCompanyRate(int companyId)
        {
            var companyRates = await companyRateRepository.GetCompanyRates(companyId);
            double avg = companyRates.Average(r => r.Rate);
            var company = await rentCarRepository.GetRentCar(companyId);
            company.Rate = avg;
            rentCarRepository.UpdateRentCarRate(company);
            try
            {
                await rentCarRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
