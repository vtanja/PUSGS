using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class OfficesModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_RentCar_RentCarId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_RentCarId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "RentCarId",
                table: "Address");

            migrationBuilder.CreateTable(
                name: "Office",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressId = table.Column<int>(nullable: false),
                    RentCarId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Office", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Office_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Office_RentCar_RentCarId",
                        column: x => x.RentCarId,
                        principalTable: "RentCar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Office_AddressId",
                table: "Office",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Office_RentCarId",
                table: "Office",
                column: "RentCarId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Office");

            migrationBuilder.AddColumn<int>(
                name: "RentCarId",
                table: "Address",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Address_RentCarId",
                table: "Address",
                column: "RentCarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_RentCar_RentCarId",
                table: "Address",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
