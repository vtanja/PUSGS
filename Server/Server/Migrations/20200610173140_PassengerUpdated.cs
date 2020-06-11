using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class PassengerUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "SendInvivation",
                table: "Passengers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SendInvivation",
                table: "Passengers");
        }
    }
}
