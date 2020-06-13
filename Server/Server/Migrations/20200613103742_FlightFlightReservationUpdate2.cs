using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class FlightFlightReservationUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "FlightPrice",
                table: "FlightFlightReservation",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlightPrice",
                table: "FlightFlightReservation");
        }
    }
}
