using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class RegisteredUser : IdentityUser
    {
        [Column(TypeName ="nvarchar(150)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string LastName { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string Address { get; set; }
        public string ProfileImage { get; set; }
        [Column(TypeName = "nvarchar(1)")]
        public char SocialUserType { get; set; }
        public bool PasswordChanged { get; set; }
    }
}
