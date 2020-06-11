using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class CarRateUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRates_CarReservations_ReservationId",
                table: "CarRates");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRates_CarReservations_ReservationId",
                table: "CompanyRates");

            migrationBuilder.DropIndex(
                name: "IX_CompanyRates_ReservationId",
                table: "CompanyRates");

            migrationBuilder.DropIndex(
                name: "IX_CarRates_ReservationId",
                table: "CarRates");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "CompanyRates");

            migrationBuilder.DropColumn(
                name: "CarRated",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "CompanyRated",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "CarRates");

            migrationBuilder.AddColumn<int>(
                name: "CarRateId",
                table: "CarReservations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyRateId",
                table: "CarReservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarReservations_CarRateId",
                table: "CarReservations",
                column: "CarRateId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservations_CompanyRateId",
                table: "CarReservations",
                column: "CompanyRateId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservations_CarRates_CarRateId",
                table: "CarReservations",
                column: "CarRateId",
                principalTable: "CarRates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservations_CompanyRates_CompanyRateId",
                table: "CarReservations",
                column: "CompanyRateId",
                principalTable: "CompanyRates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarReservations_CarRates_CarRateId",
                table: "CarReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservations_CompanyRates_CompanyRateId",
                table: "CarReservations");

            migrationBuilder.DropIndex(
                name: "IX_CarReservations_CarRateId",
                table: "CarReservations");

            migrationBuilder.DropIndex(
                name: "IX_CarReservations_CompanyRateId",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "CarRateId",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "CompanyRateId",
                table: "CarReservations");

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "CompanyRates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "CarRated",
                table: "CarReservations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CompanyRated",
                table: "CarReservations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "CarRates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRates_ReservationId",
                table: "CompanyRates",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_CarRates_ReservationId",
                table: "CarRates",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRates_CarReservations_ReservationId",
                table: "CarRates",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRates_CarReservations_ReservationId",
                table: "CompanyRates",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
