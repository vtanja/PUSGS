using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class AddReservedDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservedDate_Cars_CarId",
                table: "ReservedDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservedDate",
                table: "ReservedDate");

            migrationBuilder.RenameTable(
                name: "ReservedDate",
                newName: "ReservedDates");

            migrationBuilder.RenameIndex(
                name: "IX_ReservedDate_CarId",
                table: "ReservedDates",
                newName: "IX_ReservedDates_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservedDates",
                table: "ReservedDates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservedDates_Cars_CarId",
                table: "ReservedDates",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservedDates_Cars_CarId",
                table: "ReservedDates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservedDates",
                table: "ReservedDates");

            migrationBuilder.RenameTable(
                name: "ReservedDates",
                newName: "ReservedDate");

            migrationBuilder.RenameIndex(
                name: "IX_ReservedDates_CarId",
                table: "ReservedDate",
                newName: "IX_ReservedDate_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservedDate",
                table: "ReservedDate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservedDate_Cars_CarId",
                table: "ReservedDate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
