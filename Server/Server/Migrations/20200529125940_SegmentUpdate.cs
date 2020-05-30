using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class SegmentUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaneSegments_Segments_SegmentId",
                table: "PlaneSegments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Segments",
                table: "Segments");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Segments",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Segments",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentId",
                table: "PlaneSegments",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Segments",
                table: "Segments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaneSegments_Segments_SegmentId",
                table: "PlaneSegments",
                column: "SegmentId",
                principalTable: "Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaneSegments_Segments_SegmentId",
                table: "PlaneSegments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Segments",
                table: "Segments");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Segments");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Segments",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SegmentId",
                table: "PlaneSegments",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Segments",
                table: "Segments",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaneSegments_Segments_SegmentId",
                table: "PlaneSegments",
                column: "SegmentId",
                principalTable: "Segments",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
