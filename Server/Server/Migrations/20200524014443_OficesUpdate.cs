using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class OficesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices");


            migrationBuilder.AlterColumn<int>(
                name: "RentCarId",
                table: "Offices",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices");




            migrationBuilder.AlterColumn<int>(
                name: "RentCarId",
                table: "Offices",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));



            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);




            migrationBuilder.AddForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
