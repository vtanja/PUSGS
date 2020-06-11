using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SeatModelUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "Seat",
                table: "Passengers");

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Seats",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PassengerId",
                table: "Seats",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Seats_PassengerId",
                table: "Seats",
                column: "PassengerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats",
                column: "PassengerId",
                principalTable: "Passengers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Passengers_PassengerId",
                table: "Seats");

            migrationBuilder.DropIndex(
                name: "IX_Seats_PassengerId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Seats",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Seat",
                table: "Passengers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
