using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class PassengerUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SendInvivation",
                table: "Passengers");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SendInvitation",
                table: "Passengers");

        }
    }
}
