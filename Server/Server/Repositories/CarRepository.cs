using Microsoft.EntityFrameworkCore;
using Server.Interfaces;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class CarRepository: IDisposable,ICarRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public CarRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }
        public void AddCar(Car car)
        {
            _context.Cars.Add(car);
        }
        public async Task DeleteCar(int carID)
        {
            Car car = await _context.Cars.FindAsync(carID);
            _context.Cars.Remove(car);

        }      
        public async Task<Car> GetCarByID(int carId)
        {
            return await _context.Cars.FindAsync(carId);
        }
        public async Task<IEnumerable<Car>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }
        public async Task<IEnumerable<Car>> GetCarsWithCompanies()
        {
            return await _context.Cars.Include(c=>c.CarCompany).ToListAsync();
        }
        public async Task<IEnumerable<Car>> GetCompanyCars(int companyID)
        {
            return await _context.Cars.Where(c => c.CompanyId == companyID).ToListAsync();
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
        public void UpdateCar(Car car)
        {
            _context.Entry<Car>(car).State = EntityState.Modified;
        }
        public  bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }
        
        public async Task<IEnumerable<Car>> SearchCars(SearchCarModel searchCarModel)
        {
            DateTime dateDropOff = Convert.ToDateTime(searchCarModel.DropOffDate);
            DateTime datepickUp = Convert.ToDateTime(searchCarModel.PickUpDate);

            if (!searchCarModel.DropOffLocation.Contains(", ") || !searchCarModel.PickUpLocation.Contains(", ") || datepickUp > dateDropOff)
            {
                return new List<Car>();
            }

            string[] dropOffLocationParams = searchCarModel.DropOffLocation.Split(", ");
            string[] pickUpLocationParams = searchCarModel.PickUpLocation.Split(", ");
            string dropOffCity = dropOffLocationParams[0];
            string dropOffCountry = dropOffLocationParams[1];
            string pickUpCity = pickUpLocationParams[0];
            string pickUpCountry = pickUpLocationParams[1];


            IEnumerable<int> carIDS;

            if (searchCarModel.Passengers > 0 && !string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= searchCarModel.Passengers && c.Brand.ToLower() == searchCarModel.Brand.ToLower()).Select(c => c.Id).ToArrayAsync();
            }
            else if (searchCarModel.Passengers > 0 && string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= searchCarModel.Passengers).Select(c => c.Id).ToArrayAsync();
            }
            else if (!string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.Brand.ToLower() == searchCarModel.Brand.ToLower()).Select(c => c.Id).ToArrayAsync();
            }
            else
            {
                carIDS = await _context.Cars.Include(c => c.CarCompany).Select(c => c.Id).ToArrayAsync();
            }

            if (carIDS.Count() == 0)
            {
                return new List<Car>();
            }

            var companiesPickUp = await _context.Offices.Include(o => o.Address)
                                        .Where(o => o.Address.City == pickUpCity && o.Address.Country == pickUpCountry)
                                        .Select(o => o.RentCarId)
                                        .ToArrayAsync();

            var companiesDropOff = await _context.Offices.Include(o => o.Address)
                                       .Where(o => o.Address.City == dropOffCity && o.Address.Country == dropOffCountry)
                                       .Select(o => o.RentCarId)
                                       .ToArrayAsync();

            var intersect = companiesPickUp.Intersect(companiesDropOff).Intersect(carIDS).ToArray();

            var reservedCars = await _context.ReservedDates.Where(d => d.Date <= dateDropOff && d.Date >= datepickUp).Select(c => c.CarId).ToArrayAsync();

            var ret = await _context.Cars.Where(c => intersect.Contains(c.CompanyId) && !reservedCars.Contains(c.Id)).ToListAsync();

            return ret;
        }

        public async Task<IEnumerable<Car>> SearchCompanyCars(SearchCarModel searchCarModel)
        {
            string[] dropOffLocationParams = searchCarModel.DropOffLocation.Split(", ");
            string[] pickUpLocationParams = searchCarModel.PickUpLocation.Split(", ");
            string dropOffCity = dropOffLocationParams[0];
            string dropOffCountry = dropOffLocationParams[1];
            string pickUpCity = pickUpLocationParams[0];
            string pickUpCountry = pickUpLocationParams[1];
            DateTime dateDropOff = Convert.ToDateTime(searchCarModel.DropOffDate);
            DateTime datepickUp = Convert.ToDateTime(searchCarModel.PickUpDate);

            IEnumerable<int> carIDS;

            if (searchCarModel.Passengers > 0 && !string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= searchCarModel.Passengers && c.Brand.ToLower() == searchCarModel.Brand.ToLower() && c.CompanyId == searchCarModel.CompanyID).Select(c => c.Id).ToArrayAsync();
            }
            else if (searchCarModel.Passengers > 0 && string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= searchCarModel.Passengers && c.CompanyId == searchCarModel.CompanyID).Select(c => c.Id).ToArrayAsync();
            }
            else if (!string.IsNullOrEmpty(searchCarModel.Brand))
            {
                carIDS = await _context.Cars.Where(c => c.Brand.ToLower() == searchCarModel.Brand.ToLower() && c.CompanyId == searchCarModel.CompanyID).Select(c => c.Id).ToArrayAsync();
            }
            else
            {
                carIDS = await _context.Cars.Where(rc => rc.CompanyId == searchCarModel.CompanyID).Select(c => c.Id).ToArrayAsync();
            }

            if (carIDS.Count() == 0)
            {
                return new List<Car>();
            }

            var companiesPickUp = await _context.Offices.Include(o => o.Address)
                                        .Where(o => o.Address.City == pickUpCity && o.Address.Country == pickUpCountry && o.RentCarId == searchCarModel.CompanyID)
                                        .AnyAsync();

            var companiesDropOff = await _context.Offices.Include(o => o.Address)
                                       .Where(o => o.Address.City == dropOffCity && o.Address.Country == dropOffCountry && o.RentCarId == searchCarModel.CompanyID)
                                       .Select(o => o.RentCarId)
                                       .AnyAsync();
            if (companiesDropOff && companiesPickUp)
            {
                var reservedCars = await _context.ReservedDates.Where(d => d.Date <= dateDropOff && d.Date >= datepickUp).Select(c => c.CarId).ToArrayAsync();

               return await _context.Cars.Where(c => carIDS.Contains(c.CompanyId) && !reservedCars.Contains(c.Id)).ToListAsync();
            }

            return new List<Car>();
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
    }
}
