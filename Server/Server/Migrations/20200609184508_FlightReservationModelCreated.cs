using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class FlightReservationModelCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightReservations",
                columns: table => new
                {
                    ReservationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    TotalPrice = table.Column<double>(nullable: false),
                    FlightRated = table.Column<bool>(nullable: false),
                    AirlineRated = table.Column<bool>(nullable: false),
                    Cancelled = table.Column<bool>(nullable: false),
                    CarReservationId = table.Column<int>(nullable: true),
                    FlightId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightReservations", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_FlightReservations_CarReservations_CarReservationId",
                        column: x => x.CarReservationId,
                        principalTable: "CarReservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FlightReservations_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FlightReservations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    AcceptedInvitation = table.Column<bool>(nullable: false),
                    Seat = table.Column<string>(nullable: true),
                    Passport = table.Column<string>(nullable: true),
                    FlightReservationReservationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passengers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Passengers_FlightReservations_FlightReservationReservationId",
                        column: x => x.FlightReservationReservationId,
                        principalTable: "FlightReservations",
                        principalColumn: "ReservationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_CarReservationId",
                table: "FlightReservations",
                column: "CarReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_FlightId",
                table: "FlightReservations",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_UserId",
                table: "FlightReservations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_FlightReservationReservationId",
                table: "Passengers",
                column: "FlightReservationReservationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Passengers");

            migrationBuilder.DropTable(
                name: "FlightReservations");
        }
    }
}
