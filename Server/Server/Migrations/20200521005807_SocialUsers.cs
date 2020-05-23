using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SocialUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "RentCarAdmins",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsSocialUser",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RentCar",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Rate = table.Column<int>(nullable: false),
                    Logo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentCar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentCar_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(nullable: false),
                    Number = table.Column<string>(nullable: false),
                    City = table.Column<string>(nullable: false),
                    Country = table.Column<string>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false),
                    RentCarId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_Address_RentCar_RentCarId",
                        column: x => x.RentCarId,
                        principalTable: "RentCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Car",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rate = table.Column<int>(nullable: false),
                    PassengersNumber = table.Column<int>(nullable: false),
                    HasAirCondition = table.Column<bool>(nullable: false),
                    HasAutomationGearbox = table.Column<bool>(nullable: false),
                    Doors = table.Column<int>(nullable: false),
                    CompanyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Car", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Car_RentCar_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "RentCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    PickuUpDate = table.Column<DateTime>(nullable: false),
                    DropOffDate = table.Column<DateTime>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    CarId = table.Column<int>(nullable: false),
                    CarRated = table.Column<bool>(nullable: false),
                    CompanyRated = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarReservation_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarReservation_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DiscountDate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Discount = table.Column<int>(nullable: false),
                    DiscountPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountDate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscountDate_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservedDate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservedDate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservedDate_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarRate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rate = table.Column<int>(nullable: false),
                    ReservationId = table.Column<int>(nullable: false),
                    CarId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarRate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarRate_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarRate_CarReservation_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "CarReservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rate = table.Column<int>(nullable: false),
                    ReservationId = table.Column<int>(nullable: false),
                    RentCarId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyRate_RentCar_RentCarId",
                        column: x => x.RentCarId,
                        principalTable: "RentCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyRate_CarReservation_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "CarReservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Address_RentCarId",
                table: "Address",
                column: "RentCarId");

            migrationBuilder.CreateIndex(
                name: "IX_Car_CompanyId",
                table: "Car",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CarRate_CarId",
                table: "CarRate",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_CarRate_ReservationId",
                table: "CarRate",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservation",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_UserId",
                table: "CarReservation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRate_RentCarId",
                table: "CompanyRate",
                column: "RentCarId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRate_ReservationId",
                table: "CompanyRate",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscountDate_CarId",
                table: "DiscountDate",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_RentCar_AddressId",
                table: "RentCar",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_RentCar_OwnerId",
                table: "RentCar",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservedDate_CarId",
                table: "ReservedDate",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RentCar_Address_AddressId",
                table: "RentCar",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_RentCar_RentCarId",
                table: "Address");

            migrationBuilder.DropTable(
                name: "CarRate");

            migrationBuilder.DropTable(
                name: "CompanyRate");

            migrationBuilder.DropTable(
                name: "DiscountDate");

            migrationBuilder.DropTable(
                name: "ReservedDate");

            migrationBuilder.DropTable(
                name: "CarReservation");

            migrationBuilder.DropTable(
                name: "Car");

            migrationBuilder.DropTable(
                name: "RentCar");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropColumn(
                name: "IsSocialUser",
                table: "AspNetUsers");
        }
    }
}
