using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class RatesUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_CarReservations_ReservationId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRate_RentCar_RentCarId",
                table: "CompanyRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRate_CarReservations_ReservationId",
                table: "CompanyRate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyRate",
                table: "CompanyRate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarRate",
                table: "CarRate");

            migrationBuilder.RenameTable(
                name: "CompanyRate",
                newName: "CompanyRates");

            migrationBuilder.RenameTable(
                name: "CarRate",
                newName: "CarRates");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyRate_ReservationId",
                table: "CompanyRates",
                newName: "IX_CompanyRates_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyRate_RentCarId",
                table: "CompanyRates",
                newName: "IX_CompanyRates_RentCarId");

            migrationBuilder.RenameIndex(
                name: "IX_CarRate_ReservationId",
                table: "CarRates",
                newName: "IX_CarRates_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_CarRate_CarId",
                table: "CarRates",
                newName: "IX_CarRates_CarId");

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "RentCar",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "Cars",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyRates",
                table: "CompanyRates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarRates",
                table: "CarRates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRates_Cars_CarId",
                table: "CarRates",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarRates_CarReservations_ReservationId",
                table: "CarRates",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRates_RentCar_RentCarId",
                table: "CompanyRates",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRates_CarReservations_ReservationId",
                table: "CompanyRates",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRates_Cars_CarId",
                table: "CarRates");

            migrationBuilder.DropForeignKey(
                name: "FK_CarRates_CarReservations_ReservationId",
                table: "CarRates");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRates_RentCar_RentCarId",
                table: "CompanyRates");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRates_CarReservations_ReservationId",
                table: "CompanyRates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyRates",
                table: "CompanyRates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarRates",
                table: "CarRates");

            migrationBuilder.RenameTable(
                name: "CompanyRates",
                newName: "CompanyRate");

            migrationBuilder.RenameTable(
                name: "CarRates",
                newName: "CarRate");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyRates_ReservationId",
                table: "CompanyRate",
                newName: "IX_CompanyRate_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyRates_RentCarId",
                table: "CompanyRate",
                newName: "IX_CompanyRate_RentCarId");

            migrationBuilder.RenameIndex(
                name: "IX_CarRates_ReservationId",
                table: "CarRate",
                newName: "IX_CarRate_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_CarRates_CarId",
                table: "CarRate",
                newName: "IX_CarRate_CarId");

            migrationBuilder.AlterColumn<int>(
                name: "Rate",
                table: "RentCar",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "Rate",
                table: "Cars",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyRate",
                table: "CompanyRate",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarRate",
                table: "CarRate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_CarReservations_ReservationId",
                table: "CarRate",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRate_RentCar_RentCarId",
                table: "CompanyRate",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRate_CarReservations_ReservationId",
                table: "CompanyRate",
                column: "ReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
