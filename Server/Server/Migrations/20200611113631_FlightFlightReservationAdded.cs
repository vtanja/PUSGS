using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class FlightFlightReservationAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "FlightFlightReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlightId = table.Column<int>(nullable: false),
                    ReservationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightFlightReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightFlightReservation_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightFlightReservation_FlightReservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "FlightReservations",
                        principalColumn: "ReservationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightFlightReservation_FlightId",
                table: "FlightFlightReservation",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightFlightReservation_ReservationId",
                table: "FlightFlightReservation",
                column: "ReservationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightFlightReservation");

            migrationBuilder.AddColumn<int>(
                name: "FlightReservationReservationId",
                table: "Flights",
                type: "int",
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
    }
}
