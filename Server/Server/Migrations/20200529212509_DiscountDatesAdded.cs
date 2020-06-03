using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class DiscountDatesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountDate_Cars_CarId",
                table: "DiscountDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscountDate",
                table: "DiscountDate");


            migrationBuilder.DropColumn(
                name: "DiscountPrice",
                table: "DiscountDate");

            migrationBuilder.RenameTable(
                name: "DiscountDate",
                newName: "DiscountDates");

            migrationBuilder.RenameIndex(
                name: "IX_DiscountDate_CarId",
                table: "DiscountDates",
                newName: "IX_DiscountDates_CarId");

            migrationBuilder.AlterColumn<int>(
                name: "RentCarId",
                table: "Offices",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Discount",
                table: "DiscountDates",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscountDates",
                table: "DiscountDates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountDates_Cars_CarId",
                table: "DiscountDates",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountDates_Cars_CarId",
                table: "DiscountDates");


            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscountDates",
                table: "DiscountDates");

            migrationBuilder.RenameTable(
                name: "DiscountDates",
                newName: "DiscountDate");

            migrationBuilder.RenameIndex(
                name: "IX_DiscountDates_CarId",
                table: "DiscountDate",
                newName: "IX_DiscountDate_CarId");


            migrationBuilder.AlterColumn<int>(
                name: "RentCarId",
                table: "Offices",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Discount",
                table: "DiscountDate",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AddColumn<int>(
                name: "DiscountPrice",
                table: "DiscountDate",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscountDate",
                table: "DiscountDate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountDate_Cars_CarId",
                table: "DiscountDate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }
    }
}
