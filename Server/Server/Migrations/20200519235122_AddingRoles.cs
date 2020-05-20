using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class AddingRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("AspNetRoles",new[] { "Id", "Name" , "NormalizedName" }, new object[] {"1", "ADMINISTRATOR", "ADMINISTRATOR" }, null);
            migrationBuilder.InsertData("AspNetRoles",new[] { "Id", "Name" , "NormalizedName" },new object[] { "2", "RENTCARADMIN", "RENTCARADMIN" }, null);
            migrationBuilder.InsertData("AspNetRoles",new[] { "Id", "Name" , "NormalizedName" },new object[] { "3", "AIRLINEADMIN","AIRLINEADMIN" }, null);
            migrationBuilder.InsertData("AspNetRoles",new[] { "Id", "Name" , "NormalizedName" },new object[] { "4", "USER", "USER" }, null);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("AspNetRoles", new[] { "Id", "Name", "NormalizedName" }, new object[] { "1","ADMINISTRATOR", "ADMINISTRATOR" }, null);
            migrationBuilder.DeleteData("AspNetRoles", new[] { "Id", "Name", "NormalizedName" }, new object[] { "2","RENTCARADMIN", "RENTCARADMIN" }, null);
            migrationBuilder.DeleteData("AspNetRoles", new[] { "Id", "Name", "NormalizedName" }, new object[] { "3","AIRLINEADMIN","AIRLINEADMIN" }, null);
            migrationBuilder.DeleteData("AspNetRoles", new[] { "Id", "Name", "NormalizedName" }, new object[] { "4", "USER", "USER" }, null);

        }
    }
}
