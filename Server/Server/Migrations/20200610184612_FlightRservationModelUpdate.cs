using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class FlightRservationModelUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightReservations_Flights_FlightId",
                table: "FlightReservations");

            migrationBuilder.DropIndex(
                name: "IX_FlightReservations_FlightId",
                table: "FlightReservations");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "FlightReservations");

            migrationBuilder.AddColumn<int>(
                name: "FlightReservationReservationId",
                table: "Flights",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_FlightReservationReservationId",
                table: "Flights",
                column: "FlightReservationReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_FlightReservations_FlightReservationReservationId",
                table: "Flights",
                column: "FlightReservationReservationId",
                principalTable: "FlightReservations",
                principalColumn: "ReservationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_FlightReservations_FlightReservationReservationId",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_FlightReservationReservationId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "FlightReservationReservationId",
                table: "Flights");

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "FlightReservations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_FlightId",
                table: "FlightReservations",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightReservations_Flights_FlightId",
                table: "FlightReservations",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
