using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SeatUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "PassengerId",
                table: "Seats",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats",
                column: "PassengerId",
                principalTable: "Passengers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "PassengerId",
                table: "Seats",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats",
                column: "PassengerId",
                principalTable: "Passengers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
