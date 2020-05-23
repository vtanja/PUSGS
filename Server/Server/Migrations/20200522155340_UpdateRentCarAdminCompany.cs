using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class UpdateRentCarAdminCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "RentCarAdmins",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins",
                column: "CompanyId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCarAdmins_RentCar_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropIndex(
                name: "IX_RentCarAdmins_CompanyId",
                table: "RentCarAdmins");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "RentCarAdmins");
        }
    }
}
