using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Server.Interfaces
{
    public interface ICarRepository : IDisposable
    {
        Task<IEnumerable<Car>> GetCars();
        Task<IEnumerable<Car>> GetCarsWithCompanies();
        Task<IEnumerable<Car>> GetCompanyCars(int companyID);
        Task<IEnumerable<Car>> SearchCars(SearchCarModel searchCarModel);
        Task<IEnumerable<Car>> SearchCompanyCars(SearchCarModel searchCarModel);
        Task<IEnumerable<Car>> SearchCarsOnDiscount(SearchCarModel searchCarModel);
        Task<Car> GetCarByID(int carId);
        Task<Car> GetCarWithReservationData(int carId);
        void AddCar(Car car);
        void AddReservationToCar(Car car, CarReservation carReservationcar);
        void AddReservedDateToCar(Car car, ReservedDate reservedDate);
        void AddDiscountDateToCar(Car car, DiscountDate discountDate);
        Task DeleteCar(int carID);
        void UpdateCar(Car car);
        Task Save();
        bool CarExists(int id);

    }
}
