using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class CarReservationsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_CarReservation_ReservationId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Users_UserId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRate_CarReservation_ReservationId",
                table: "CompanyRate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarReservation",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "PickuUpDate",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "CarReservation");

            migrationBuilder.RenameTable(
                name: "CarReservation",
                newName: "CarReservations");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservation_UserId",
                table: "CarReservations",
                newName: "IX_CarReservations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservations",
                newName: "IX_CarReservations_CarId");

            migrationBuilder.AddColumn<DateTime>(
                name: "PickUpDate",
                table: "CarReservations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PricePerDay",
                table: "CarReservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalPrice",
                table: "CarReservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarReservations",
                table: "CarReservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_CarReservations_ReservationId",
                table: "CarRate",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservations_Cars_CarId",
                table: "CarReservations",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservations_Users_UserId",
                table: "CarReservations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRate_CarReservations_ReservationId",
                table: "CompanyRate",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_CarReservations_ReservationId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservations_Cars_CarId",
                table: "CarReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservations_Users_UserId",
                table: "CarReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRate_CarReservations_ReservationId",
                table: "CompanyRate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarReservations",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "PickUpDate",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "PricePerDay",
                table: "CarReservations");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "CarReservations");

            migrationBuilder.RenameTable(
                name: "CarReservations",
                newName: "CarReservation");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservations_UserId",
                table: "CarReservation",
                newName: "IX_CarReservation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservations_CarId",
                table: "CarReservation",
                newName: "IX_CarReservation_CarId");

            migrationBuilder.AddColumn<DateTime>(
                name: "PickuUpDate",
                table: "CarReservation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "CarReservation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarReservation",
                table: "CarReservation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_CarReservation_ReservationId",
                table: "CarRate",
                column: "ReservationId",
                principalTable: "CarReservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Users_UserId",
                table: "CarReservation",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRate_CarReservation_ReservationId",
                table: "CompanyRate",
                column: "ReservationId",
                principalTable: "CarReservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
