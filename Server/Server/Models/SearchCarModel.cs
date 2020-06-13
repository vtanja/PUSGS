using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class SearchCarModel
    {
        private string pickUpLocation;
        private string dropOffLocation;
        private string pickUpDate;
        private string dropOffDate;
        private int passengers;
        private string brand;
        private int companyID;
        private int daysNumber;

        public string PickUpLocation { get => pickUpLocation; set => pickUpLocation = value; }
        public string DropOffLocation { get => dropOffLocation; set => dropOffLocation = value; }
        public string PickUpDate { get => pickUpDate; set => pickUpDate = value; }
        public string DropOffDate { get => dropOffDate; set => dropOffDate = value; }
        public int Passengers { get => passengers; set => passengers = value; }
        public string Brand { get => brand; set => brand = value; }
        public int CompanyID { get => companyID; set => companyID = value; }
        public int DaysNumber { get => daysNumber; set => daysNumber = value; }
    }
}
