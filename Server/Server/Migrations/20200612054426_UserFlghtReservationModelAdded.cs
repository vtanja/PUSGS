using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class UserFlghtReservationModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightReservations_Users_UserId",
                table: "FlightReservations");

            migrationBuilder.DropIndex(
                name: "IX_FlightReservations_UserId",
                table: "FlightReservations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FlightReservations");

            migrationBuilder.AddColumn<int>(
                name: "FlightReservationReservationId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserFlightReservations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    ReservationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFlightReservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFlightReservations_FlightReservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "FlightReservations",
                        principalColumn: "ReservationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFlightReservations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_FlightReservationReservationId",
                table: "Users",
                column: "FlightReservationReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFlightReservations_ReservationId",
                table: "UserFlightReservations",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFlightReservations_UserId",
                table: "UserFlightReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_FlightReservations_FlightReservationReservationId",
                table: "Users",
                column: "FlightReservationReservationId",
                principalTable: "FlightReservations",
                principalColumn: "ReservationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_FlightReservations_FlightReservationReservationId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UserFlightReservations");

            migrationBuilder.DropIndex(
                name: "IX_Users_FlightReservationReservationId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FlightReservationReservationId",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "FlightReservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservations_UserId",
                table: "FlightReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightReservations_Users_UserId",
                table: "FlightReservations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
