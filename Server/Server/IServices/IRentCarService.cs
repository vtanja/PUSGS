using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IRentCarService
    {
        Task<IEnumerable<RentCar>> GetRentCars();
        Task<List<RentCar>> SearchRentCars(string name, string address, int rate);
        Task<RentCar> GetRentCarByID(int rentCarId);
        Task<RentCar> GetRentCarMainData(string ownerId);
        Task<bool> AddRentCar(RentCar rentCar);
        Task<bool> DeleteRentCar(int rentCarId);
        Task<bool> UpdateRentCar(RentCar rentCar);
        Task<double> GetCompanyRate(int id);

    }
}
