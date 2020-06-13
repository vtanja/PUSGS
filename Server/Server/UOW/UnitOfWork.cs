using Microsoft.AspNetCore.Mvc.Formatters;
using Server.Repositories;
using Server.Services;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
        private FriendshipService friendshipService;
        private AirlineService airlineService;
        private DestinationService destinationService;
        private PlaneService planeService;
        private SegmentService segmentService;
        private FlightService flightService;
        private FlightReservationService flightReservationService;
        private CarRateService carRateService;
        private CompanyRateService companyRateService;
        private FlightRateService flightRateService;
        private AirlineRateService airlineRateService;
        private RentCarAdminService rentCarAdminService;
        private AirlineAdminService airlineAdminService;
        private AddressService addressService;

        private CarRepository carRepository;
        private RentCarRepository rentCarRepository;
        private OfficeRepository officeRepository;
        private CarReservationRepository carReservationRepository;
        private ReservedDateRepository reservedDateRepository;
        private DiscountDateRepository discountDateRepository;
        private BonusPointsDiscountRepository bpDiscountRepository;
        private FriendshipRepository friendshipRepository;
        private AirlineRepository airlineRepository;
        private DestinationRepository destinationRepository;
        private PlaneRepository planeRepository;
        private SegmentRepository segmentRepository;
        private FlightRepository flightRepository;
        private FlightReservationRepository flightReservationRepository;
        private CarRateRepository carRateRepository;
        private CompanyRateRepository companyRateRepository;
        private AirlineRateRepository airlineRateRepository;
        private FlightRateRepository flightRateRepository;
        private RentCarAdminRepository rentCarAdminRepository;
        private AirlineAdminRepository airlineAdminRepository;
        private AddressRepository addressRepository;

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
            friendshipRepository = new FriendshipRepository(_context);
            airlineRepository = new AirlineRepository(_context);
            destinationRepository = new DestinationRepository(_context);
            planeRepository = new PlaneRepository(_context);
            segmentRepository = new SegmentRepository(_context);
            flightRepository = new FlightRepository(_context);
            flightReservationRepository = new FlightReservationRepository(_context);
            carRateRepository = new CarRateRepository(_context);
            companyRateRepository = new CompanyRateRepository(_context);
            airlineRateRepository = new AirlineRateRepository(_context);
            flightRateRepository = new FlightRateRepository(_context);
            rentCarAdminRepository = new RentCarAdminRepository(_context);
            airlineAdminRepository = new AirlineAdminRepository(_context);
            addressRepository = new AddressRepository(_context);
        }

        public FlightReservationService FlightReservationService
        {
            get
            {
                if(this.flightReservationService == null)
                {
                    this.flightReservationService = new FlightReservationService(flightReservationRepository, flightRepository);
                }
                return this.flightReservationService;
            }
        }

        public FlightService FlightService
        {
            get
            {
                if (this.flightService == null)
                {
                    this.flightService = new FlightService(flightRepository);
                }

                return this.flightService;
            }
        }


        public SegmentService SegmentService
        {
            get
            {
                if (this.segmentService == null)
                {
                    this.segmentService = new SegmentService(segmentRepository);
                }

                return this.segmentService;
            }
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
                    this.carReservationService = new CarReservationService(carRepository,carReservationRepository,reservedDateRepository,discountDateRepository);
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
                    discountDateService = new DiscountDateService(discountDateRepository,carReservationRepository,carRepository);
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

        public FriendshipService FriendshipService {
            get { 
                if(friendshipService == null)
                {
                    friendshipService = new FriendshipService(friendshipRepository);
                }
                return this.friendshipService;
            }
        }

        public AirlineService AirlineService
        {
            get
            {
                if (airlineService == null)
                {
                    airlineService = new AirlineService(airlineRepository);
                }
                return this.airlineService;
            }
        }

        public DestinationService DestinationService {
            get
            {
                if(destinationService == null)
                {
                    destinationService = new DestinationService(destinationRepository, flightRepository);
                }
                return this.destinationService;
            }
        }

        public PlaneService PlaneService
        {
            get
            {
                if (planeService == null)
                {
                    planeService = new PlaneService(planeRepository, segmentRepository);
                }
                return this.planeService;
            }
        }

        public CarRateService CarRateService
        {
            get
            {
                if (carRateService == null)
                {
                    carRateService = new CarRateService(carRepository, carRateRepository, carReservationRepository);
                }
                return carRateService;
            }
        }

        public CompanyRateService CompanyRateService
        {
            get
            {
                if(companyRateService == null)
                {
                    companyRateService = new CompanyRateService(carRepository, rentCarRepository, companyRateRepository, carReservationRepository);
                }

                return companyRateService;
            }
        }

        public FlightRateService FlightRateService
        {
            get
            {
                if (flightRateService == null)
                {
                    flightRateService = new FlightRateService(flightRepository,flightRateRepository,flightReservationRepository);
                }
                return flightRateService;
            }
        }

        public AirlineRateService AirlineRateService
        {
            get
            {
                if (airlineRateService == null)
                {
                    airlineRateService = new AirlineRateService(airlineRateRepository,flightReservationRepository,airlineRepository);
                }

                return airlineRateService;
            }
        }

        public RentCarAdminService RentCarAdminService
        {
            get
            {
                if (rentCarAdminService == null)
                {
                    rentCarAdminService = new RentCarAdminService(rentCarAdminRepository);
                }
                return rentCarAdminService;
            }
        }

        public AirlineAdminService AirlineAdminService
        {
            get
            {
                if (airlineAdminService == null)
                {
                    airlineAdminService = new AirlineAdminService(airlineAdminRepository);
                }
                return airlineAdminService;
            }
        }

        public AddressService AddressService
        {
            get
            {
                if (addressService == null)
                {
                    addressService = new AddressService(addressRepository);
                }
                return addressService;
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
