using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class UserModelUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "BonusPoints",
                table: "Users",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "AddedBonus",
                table: "Passengers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BonusPoints",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddedBonus",
                table: "Passengers");
        }
    }
}
