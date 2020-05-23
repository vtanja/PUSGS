using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class UpdateOnRentCarAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Car_RentCar_CompanyId",
                table: "Car");

            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Car_CarId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscountDate_Car_CarId",
                table: "DiscountDate");

            migrationBuilder.DropForeignKey(
                name: "FK_Office_Address_AddressId",
                table: "Office");

            migrationBuilder.DropForeignKey(
                name: "FK_Office_RentCar_RentCarId",
                table: "Office");

            migrationBuilder.DropForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservedDate_Car_CarId",
                table: "ReservedDate");

            migrationBuilder.DropIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Office",
                table: "Office");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Car",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.RenameTable(
                name: "Office",
                newName: "Offices");

            migrationBuilder.RenameTable(
                name: "Car",
                newName: "Cars");

            migrationBuilder.RenameIndex(
                name: "IX_Office_RentCarId",
                table: "Offices",
                newName: "IX_Offices_RentCarId");

            migrationBuilder.RenameIndex(
                name: "IX_Office_AddressId",
                table: "Offices",
                newName: "IX_Offices_AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Car_CompanyId",
                table: "Cars",
                newName: "IX_Cars_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Offices",
                table: "Offices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cars",
                table: "Cars",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_RentCar_CompanyId",
                table: "Cars",
                column: "CompanyId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountDate_Cars_CarId",
                table: "DiscountDate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_Address_AddressId",
                table: "Offices",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservedDate_Cars_CarId",
                table: "ReservedDate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentCar_CompanyId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscountDate_Cars_CarId",
                table: "DiscountDate");

            migrationBuilder.DropForeignKey(
                name: "FK_Offices_Address_AddressId",
                table: "Offices");

            migrationBuilder.DropForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservedDate_Cars_CarId",
                table: "ReservedDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Offices",
                table: "Offices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cars",
                table: "Cars");

            migrationBuilder.RenameTable(
                name: "Offices",
                newName: "Office");

            migrationBuilder.RenameTable(
                name: "Cars",
                newName: "Car");

            migrationBuilder.RenameIndex(
                name: "IX_Offices_RentCarId",
                table: "Office",
                newName: "IX_Office_RentCarId");

            migrationBuilder.RenameIndex(
                name: "IX_Offices_AddressId",
                table: "Office",
                newName: "IX_Office_AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_CompanyId",
                table: "Car",
                newName: "IX_Car_CompanyId");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "RentCarAdmins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Office",
                table: "Office",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Car",
                table: "Car",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Car_RentCar_CompanyId",
                table: "Car",
                column: "CompanyId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Car_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountDate_Car_CarId",
                table: "DiscountDate",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Office_Address_AddressId",
                table: "Office",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Office_RentCar_RentCarId",
                table: "Office",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservedDate_Car_CarId",
                table: "ReservedDate",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
