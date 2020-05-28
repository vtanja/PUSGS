using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class DestinationTableUpdatedAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "AirlinId",
                table: "Destinations");

            migrationBuilder.AlterColumn<int>(
                name: "AirlineId",
                table: "Destinations",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations");

            migrationBuilder.AlterColumn<int>(
                name: "AirlineId",
                table: "Destinations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "AirlinId",
                table: "Destinations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
