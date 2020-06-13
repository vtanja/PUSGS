using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SendInvitationColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "SendInvitation",
                table: "Passengers",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
               name: "SendInvitation",
               table: "Passengers");
        }
    }
}
