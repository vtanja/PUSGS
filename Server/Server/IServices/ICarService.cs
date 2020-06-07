using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetCars();
        Task<IEnumerable<Car>> GetCarsWithCompanies();
        Task<IEnumerable<Car>> GetCompanyCars(int companyID);
        Task<IEnumerable<Car>> SearchCars(SearchCarModel searchCarModel);
        Task<IEnumerable<Car>> SearchCompanyCars(SearchCarModel searchCarModel);
        Task<Car> GetCarByID(int carId);
        Task<bool> AddCar(Car car);
        Task<string> DeleteCar(int carID);
        Task<bool> UpdateCar(int carId,Car car);
    }
}
