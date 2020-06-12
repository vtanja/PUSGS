using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface ICarRateService
    {
        Task<bool> AddCarRate(RateModel rateModel);
    }
}
