﻿using AutoMapper;
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
                .ForMember(dest => dest.Doors, opt => opt.MapFrom(src => src.Doors));


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
                .ForMember(dest => dest.username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.firstName, opt => opt.MapFrom(src => src.RegisteredUser.FirstName))
                .ForMember(dest => dest.lastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.phoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber))
                .ForMember(dest => dest.address, opt => opt.MapFrom(src => src.RegisteredUser.Address));

            CreateMap<RentCarAdmin, UserDTO>()
                .ForMember(dest => dest.username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.firstName, opt => opt.MapFrom(src => src.RegisteredUser.FirstName))
                .ForMember(dest => dest.lastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.phoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber))
                .ForMember(dest => dest.address, opt => opt.MapFrom(src => src.RegisteredUser.Address));
           
            CreateMap<User, UserDTO>()
                .ForMember(dest=>dest.FirstName, opt=>opt.MapFrom(src=>src.RegisteredUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.RegisteredUser.LastName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.RegisteredUser.UserName))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.RegisteredUser.Address))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.RegisteredUser.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.RegisteredUser.PhoneNumber)).ReverseMap();

           
        }
    }
}