using Server.Repositories;
using Server.Services;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.UOW
{
    public class UnitOfWork : IDisposable,IUnitOfWork
    {
        private bool disposed;
        private DataBaseContext _context;
        private CarService carService;
        private RentCarService rentCarService;
        private CarReservationService carReservationService;
        private OfficeService officeService;
        public DiscountDateService discountDateService;
        private BonusPointsDiscountService bpDiscountService;

        private CarRepository carRepository;
        private RentCarRepository rentCarRepository;
        private OfficeRepository officeRepository;
        private CarReservationRepository carReservationRepository;
        private ReservedDateRepository reservedDateRepository;
        private DiscountDateRepository discountDateRepository;
        private BonusPointsDiscountRepository bpDiscountRepository;

        public UnitOfWork(DataBaseContext context)
        {
            _context = context;
            disposed = false;

            carRepository = new CarRepository(_context);
            rentCarRepository = new RentCarRepository(_context);
            officeRepository = new OfficeRepository(_context);
            carReservationRepository = new CarReservationRepository(_context);
            reservedDateRepository = new ReservedDateRepository(_context);
            discountDateRepository = new DiscountDateRepository(_context);
            bpDiscountRepository = new BonusPointsDiscountRepository(_context);
        }

        public CarService CarService
        {
            get
            {
                if (this.carService == null)
                {
                    this.carService = new CarService(carRepository,reservedDateRepository);
                }

                return this.carService;
            }
        }

        public RentCarService RentCarService
        {
            get
            {
                if (this.rentCarService == null)
                {
                    this.rentCarService = new RentCarService(rentCarRepository);
                }
                return this.rentCarService;
            }
        }

        public OfficeService OfficeService
        {
            get
            {
                if (this.officeService == null)
                {
                    this.officeService = new OfficeService(officeRepository);
                }
                return this.officeService;
            }
        }

        public CarReservationService CarReservationService
        {
            get
            {
                if (this.carReservationService == null)
                {
                    this.carReservationService = new CarReservationService(carReservationRepository,reservedDateRepository);
                }
                return this.carReservationService;
            }
        }

        public DiscountDateService DiscountDateService
        {
            get
            {
                if (discountDateService == null)
                {
                    discountDateService = new DiscountDateService(discountDateRepository,carReservationRepository);
                }
                return this.discountDateService;
            }
        }

        public BonusPointsDiscountService BpDiscountService {
            get {
                if (bpDiscountService == null)
                {
                    bpDiscountService = new BonusPointsDiscountService(bpDiscountRepository);
                }
                return this.bpDiscountService;
            } 
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
