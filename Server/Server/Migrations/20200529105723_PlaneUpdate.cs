using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class PlaneUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Offices_RentCar_RentCarId",
            //    table: "Offices");

            migrationBuilder.AddColumn<int>(
                name: "PlaneId",
                table: "Segment",
                nullable: true);

            //migrationBuilder.AlterColumn<int>(
            //    name: "RentCarId",
            //    table: "Offices",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int",
            //    oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Segment_PlaneId",
                table: "Segment",
                column: "PlaneId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Offices_RentCar_RentCarId",
            //    table: "Offices",
            //    column: "RentCarId",
            //    principalTable: "RentCar",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Segment_Planes_PlaneId",
                table: "Segment",
                column: "PlaneId",
                principalTable: "Planes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices");

            migrationBuilder.DropForeignKey(
                name: "FK_Segment_Planes_PlaneId",
                table: "Segment");

            migrationBuilder.DropIndex(
                name: "IX_Segment_PlaneId",
                table: "Segment");

            migrationBuilder.DropColumn(
                name: "PlaneId",
                table: "Segment");

            migrationBuilder.AlterColumn<int>(
                name: "RentCarId",
                table: "Offices",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_RentCar_RentCarId",
                table: "Offices",
                column: "RentCarId",
                principalTable: "RentCar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
