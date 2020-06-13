using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CarService : ICarService
    {
        private CarRepository carRepository;
        private ReservedDateRepository reservedDateRepository;

        public CarService(CarRepository carRepository,ReservedDateRepository reservedDateRepository)
        {
            this.carRepository = carRepository;
            this.reservedDateRepository = reservedDateRepository;
        }

        public async Task<bool> AddCar(Car car)
        {
            carRepository.AddCar(car);
            try
            {
                await carRepository.Save();
            }catch{
                return false;
            }
            return true;
        }
        public async Task<string> DeleteCar(int carID)
        {
            if (!carRepository.CarExists(carID))
                return "error";

            if (!await CanBeDeleted(carID))
                return "failed";

            var car = await carRepository.GetCarByID(carID);
            carRepository.UpdateCar(car);
            car.IsDeleted = true;

            try
            {
                await carRepository.Save();
            }
            catch
            {
                return "error";
            }
            return "success";
        }
        public async Task<Car> GetCarByID(int carId)
        {
            return await carRepository.GetCarByID(carId);
        }
        public async Task<IEnumerable<Car>> GetCars()
        {
            return await carRepository.GetCars();
        }
        public async Task<IEnumerable<Car>> GetCarsWithCompanies()
        {
            return await carRepository.GetCarsWithCompanies();
        }
        public async Task<IEnumerable<Car>> GetCompanyCars(int companyID)
        {

            return await carRepository.GetCompanyCars(companyID);
        }
        public async Task<IEnumerable<Car>> SearchCars(SearchCarModel searchCarModel)
        {
            return await carRepository.SearchCars(searchCarModel);
        }
        public async Task<IEnumerable<Car>> SearchCompanyCars(SearchCarModel searchCarModel)
        {
            return await carRepository.SearchCars(searchCarModel);
        }
        public async Task<IEnumerable<Car>> SearchCarsOnDiscount(SearchCarModel searchCarModel)
        {
            if (searchCarModel.DaysNumber > 0)
            {
                searchCarModel.DropOffDate = Convert.ToDateTime(searchCarModel.PickUpDate).AddDays(searchCarModel.DaysNumber).ToString();
            }

            if (String.IsNullOrEmpty(searchCarModel.DropOffLocation))
            {
                searchCarModel.DropOffLocation = searchCarModel.PickUpLocation;
            }

            return await carRepository.SearchCarsOnDiscount(searchCarModel);
        }
        public async Task<bool> UpdateCar(int carId,Car car)
        {
            if (carId != car.Id)
                return false;

            var carr = await carRepository.GetCarByID(carId);
            if (carr == null)
                return false;

            carr.Price = car.Price;
            carRepository.UpdateCar(carr);
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
        private async Task<bool> CanBeDeleted(int carID)
        {            
            return !(await reservedDateRepository.IsCarReserved(carID));
        }
    }
}
