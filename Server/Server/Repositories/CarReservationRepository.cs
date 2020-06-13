using Microsoft.EntityFrameworkCore;
using Server.IRepositories;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class CarReservationRepository : ICarReservationRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public CarReservationRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddCarReservation(CarReservation reservation)
        {
            _context.CarReservations.Add(reservation);
        }
        public void UpdateCarReservation(CarReservation reservation)
        {
            _context.Entry<CarReservation>(reservation).State = EntityState.Modified;
        }
        public async Task<CarReservation> GetCarReservation(int reservationId)
        {
            return await _context.CarReservations.FindAsync(reservationId);
        }
        public async Task<List<CarReservation>> GetUserCarReservation(string userId)
        {
            return await _context.CarReservations.Include(r=>r.CarRate).Include(r=>r.CompanyRate)
                .Include(r=>r.Car).ThenInclude(c=>c.CarCompany).Where(r => r.UserId == userId).ToListAsync();
        }
        public async Task<IEnumerable<CarReservation>> GetCarReservations(int carId)
        {
            return await _context.CarReservations.Where(r => r.CarId == carId).ToListAsync();
        }
        public bool CarReservationExists(int id)
        {
            return _context.CarReservations.Any(e => e.Id == id);
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public async Task<bool> CarReservationExists(DateTime date, int carId)
        {
            CarReservation reservation = null;
            try
            {
                reservation = await _context.CarReservations.Where(r => r.PickUpDate <= date && r.DropOffDate >= date && r.CarId == carId).FirstOrDefaultAsync();
            }
            catch{
                return false;
            }

            if (reservation != null)
                return true;
            return false;
        }
        public async Task<Dictionary<string,int>> GetDailyReservationReport(int companyId)
        {
            var ret = await  _context.CarReservations.Include(r => r.Car).Where(r => r.Car.CompanyId == companyId && !r.Cancelled && r.DateCreated.Date == DateTime.Now.Date).ToListAsync();
            var carIDS = ret.Select(c => c.CarId).ToList();
            var notIn = await _context.Cars.Where(c => c.CompanyId == companyId && !carIDS.Contains(c.Id) && !c.IsDeleted).ToListAsync();

            var result =  ret.GroupBy(r => r.Car.Brand + " " + r.Car.Model + " " + r.Car.Year.ToString() + " " + "[id = " + r.CarId.ToString() + "]").ToDictionary(g => g.Key.ToString(), g => g.ToList().Count());
            
            foreach(var car in notIn)
            {
                result.Add(car.Brand + " " + car.Model + " " + car.Year.ToString() + " " + "[id = " + car.Id.ToString() + "]", 0);
            }

            return result;
        }
        public async Task<Dictionary<string, int>> GetRangeReservationReport(int companyId,DateTime startDate,DateTime endDate)
        {
            var ret = await _context.CarReservations.Include(r => r.Car).Where(r => r.Car.CompanyId == companyId && !r.Cancelled && r.DateCreated.Date >= startDate.Date && r.DateCreated <= endDate.Date).ToListAsync();
            var carIDS = ret.Select(c => c.CarId).ToList();
            var notIn = await _context.Cars.Where(c => c.CompanyId == companyId && !carIDS.Contains(c.Id) && !c.IsDeleted).ToListAsync();
            var result = ret.GroupBy(r => r.Car.Brand + " " + r.Car.Model + " " + r.Car.Year.ToString() + " " + "\n[id = " + r.CarId.ToString() + "]").ToDictionary(g => g.Key, g => g.Count());

            foreach (var car in notIn)
            {
                result.Add(car.Brand + " " + car.Model + " " + car.Year.ToString() + " " + "[id = " + car.Id.ToString() + "]", 0);
            }

            return result;

        }
        public async Task<Dictionary<int, double>> GetMonthlyIncomes(int companyId,int month,int year)
        {

            var ret = await _context.CarReservations.Include(r => r.Car).Where(r => r.Car.CompanyId == companyId && !r.Cancelled && r.DateCreated.Date.Year == year && r.DateCreated.Month == month).ToListAsync();

            var result = ret.GroupBy(r => r.DateCreated.Date.Day).ToDictionary(g => g.Key, g => g.Sum(r => r.TotalPrice));

            return result; ;
        }
        public async Task<Dictionary<int, double>> GetAnnualIncomes(int companyId,int year)
        {
            var ret = await _context.CarReservations.Include(r => r.Car).Where(r => r.Car.CompanyId == companyId && !r.Cancelled && r.DateCreated.Date.Year==year).ToListAsync();

            var result = ret.GroupBy(r => r.DateCreated.Date.Month).ToDictionary(g => g.Key, g => g.Sum(r => r.TotalPrice));
           
            return result;
        
        }
    }
}
