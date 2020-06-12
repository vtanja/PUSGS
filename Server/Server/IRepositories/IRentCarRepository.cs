using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IRentCarRepository : IDisposable
    {
        Task<IEnumerable<RentCar>> GetRentCars();
        Task<List<RentCar>> SearchRentCars(string name,string address,int rate);
        Task<RentCar> GetRentCarByID(int rentCarId);
        Task<RentCar> GetRentCar(int rentCarId);
        Task<RentCar> GetRentCarMainData(string ownerId);
        void AddRentCar(RentCar rentCar);
        Task DeleteRentCar(int rentCarId);
        bool UpdateRentCar(RentCar rentCar);
        void UpdateRentCarRate(RentCar rentCar);
        Task Save();
        bool RentCarExists(int id);
    }
}
