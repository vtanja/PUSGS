using AutoMapper;
using Server.Models;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Flight, FlightDTO>()
                .ForMember(dest => dest.TakeOffDate, opt => opt.MapFrom(src => src.TakeOffDate))
                .ForMember(dest => dest.TakeOffLocation, opt => opt.MapFrom(src => src.TakeOffLocation))
                .ForMember(dest => dest.TakeOffTime, opt => opt.MapFrom(src => src.TakeOffTime))
                .ForMember(dest => dest.LandingDate, opt => opt.MapFrom(src => src.LandingDate))
                .ForMember(dest => dest.LandingLocation, opt => opt.MapFrom(src => src.LandingLocation))
                .ForMember(dest => dest.LandingTime, opt => opt.MapFrom(src => src.LandingTime))
                .ForMember(dest => dest.Connections, opt => opt.MapFrom(src => src.Connections))
                .ForMember(dest => dest.SegmentPrices, opt => opt.MapFrom(src => src.SegmentPrices))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<Airline, AirlineDTO>()
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Logo, opt => opt.MapFrom(src => src.Logo))
                .ForMember(dest => dest.Rate, opt => opt.MapFrom(src => src.Rate))
                .ForMember(dest => dest.Planes, opt => opt.MapFrom(src => src.Planes))
                .ForMember(dest => dest.Destinations, opt => opt.MapFrom(src => src.Destinations.GroupBy(g => g.Country).ToDictionary(g => g.Key, g =>g.ToList()))).ReverseMap();

            CreateMap<Plane, PlaneDTO>()
                .ForMember(dest=>dest.Code, opt=>opt.MapFrom(src=>src.Code))
                .ForMember(dest=>dest.Segments, opt=>opt.MapFrom(src=>src.Segments))
                .ForMember(dest=>dest.Airline, opt=>opt.MapFrom(src=>src.Airline));

            CreateMap<Segment, SegmentDTO>()
                .ForMember(dest => dest.Columns, opt => opt.MapFrom(src => src.Columns))
                .ForMember(dest => dest.Rows, opt => opt.MapFrom(src => src.Rows))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));

            CreateMap<AirlineAdmin, AirlineAdminDTO>()
                .ForMember(dest => dest.AirlineId, opt => opt.MapFrom(src => src.AirlineId));

            CreateMap<Destination, DestinationDTO>()
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country));

            CreateMap<Car, CarDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand))
                .ForMember(dest => dest.Model, opt => opt.MapFrom(src => src.Model))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year))
                .ForMember(dest => dest.Rate, opt => opt.MapFrom(src => src.Rate))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.PassengersNumber, opt => opt.MapFrom(src => src.PassengersNumber))
                .ForMember(dest => dest.HasAirCondition, opt => opt.MapFrom(src => src.HasAirCondition))
                .ForMember(dest => dest.HasAutomationGearbox, opt => opt.MapFrom(src => src.HasAutomationGearbox))
                .ForMember(dest => dest.Doors, opt => opt.MapFrom(src => src.Doors))
                .ForMember(dest => dest.CompanyId, opt => opt.MapFrom(src => src.CompanyId))
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => (src.CarCompany==null?"":src.CarCompany.Name)));


            CreateMap<RentCar, RentCarDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Rate, opt => opt.MapFrom(src => src.Rate))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.Cars, opt => opt.MapFrom(src => src.Cars))
                .ForMember(dest => dest.Offices, opt => opt.MapFrom(src => src.Offices.GroupBy(g => g.Address.Country).ToDictionary(g => g.Key, g => g.ToList())))
                .ForMember(dest => dest.Logo, opt => opt.MapFrom(src => src.Logo));

            CreateMap<Office, OfficeDTO>()
                .ForMember(dest => dest.OfficeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Address.City))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Address.Country))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Address.Number))
                .ForMember(dest => dest.Street, opt => opt.MapFrom(src => src.Address.Street))
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Address.Longitude))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Address.Latitude));

            CreateMap<AirlineAdmin, UserDTO>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.RegisteredUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.RegisteredUser.Address));

            CreateMap<RentCarAdmin, UserDTO>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.RegisteredUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.RegisteredUser.Address));
           
            CreateMap<User, UserDTO>()
                .ForMember(dest=>dest.FirstName, opt=>opt.MapFrom(src=>src.RegisteredUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.RegisteredUser.Address))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber)).ReverseMap();

            CreateMap<DiscountDate, DiscountDateDTO>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToShortDateString()))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Discount)).ReverseMap();
           
        }
    }
}
