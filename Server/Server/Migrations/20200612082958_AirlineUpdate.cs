using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class AirlineUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rate",
                table: "Flights",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "Airlines",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Flights");

            migrationBuilder.AlterColumn<int>(
                name: "Rate",
                table: "Airlines",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
