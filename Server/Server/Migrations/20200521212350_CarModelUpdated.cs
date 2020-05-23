using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class CarModelUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Car",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Car",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Car",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Car",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Car",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Car");
        }
    }
}
