using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SocialUserType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSocialUser",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "SocialUserType",
                table: "AspNetUsers",
                type: "nvarchar(1)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SocialUserType",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "IsSocialUser",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);
        }
    }
}
