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
    public class AutoMapping:Profile
    {
        public AutoMapping()
        {
           
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
