using Microsoft.AspNetCore.Mvc;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class RentCarService : IRentCarService
    {
        private IRentCarRepository rentCarRepository;

        public RentCarService(IRentCarRepository rentCarRepository)
        {
            this.rentCarRepository = rentCarRepository;
        }

        public async Task<bool> AddRentCar(RentCar rentCar)
        {
            rentCarRepository.AddRentCar(rentCar);
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

        public async Task<bool> DeleteRentCar(int rentCarId)
        {
            if (!rentCarRepository.RentCarExists(rentCarId))
                return false;
            await rentCarRepository.DeleteRentCar(rentCarId);
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

        public async Task<RentCar> GetRentCarByID(int rentCarId)
        {
            return await rentCarRepository.GetRentCarByID(rentCarId);
        }

        public async Task<RentCar> GetRentCarMainData(string ownerId)
        {
            return await rentCarRepository.GetRentCarMainData(ownerId);

        }

        public async Task<IEnumerable<RentCar>> GetRentCars()
        {
            return await rentCarRepository.GetRentCars();
        }

        public async Task<List<RentCar>> SearchRentCars(string name,string address,int rate)
        {
            return await rentCarRepository.SearchRentCars(name, address, rate);
        }

        public async Task<bool> UpdateRentCar(RentCar rentCar)
        {
            if (rentCarRepository.UpdateRentCar(rentCar))
            {
                try
                {
                   await rentCarRepository.Save();
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            return true;
        }

        public async Task<int> GetCompanyRate(int id)
        {
            var rentCar = await rentCarRepository.GetRentCar(id);
            return rentCar.Rate;
        }
    }
}
