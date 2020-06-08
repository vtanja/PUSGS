using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonusPointsDiscountsController : ControllerBase
    {
        private readonly BonusPointsDiscountService bonusPointsDiscountService;

        public BonusPointsDiscountsController(UnitOfWork unitOfWork)
        {
            bonusPointsDiscountService = unitOfWork.BpDiscountService;
        }

        // GET: api/BonusPointsDiscounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BonusPointsDiscount>>> GetBonusPointsDiscounts()
        {
            return await bonusPointsDiscountService.GetBonusPointsDiscounts();
        }


        // PUT: api/BonusPointsDiscounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutBonusPointsDiscount( List<BonusPointsDiscount> bonusPointsDiscounts)
        {
            
            if(await bonusPointsDiscountService.UpdateBonusPointDiscounts(bonusPointsDiscounts))
                return NoContent();
            return BadRequest();
        }


    }
}
