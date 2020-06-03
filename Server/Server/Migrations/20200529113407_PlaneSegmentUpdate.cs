using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class PlaneSegmentUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaneSegments_Segment_SegmentId",
                table: "PlaneSegments");

            migrationBuilder.DropForeignKey(
                name: "FK_Segment_Planes_PlaneId",
                table: "Segment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Segment",
                table: "Segment");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Segment");

            migrationBuilder.RenameTable(
                name: "Segment",
                newName: "Segments");

            migrationBuilder.RenameIndex(
                name: "IX_Segment_PlaneId",
                table: "Segments",
                newName: "IX_Segments_PlaneId");

            migrationBuilder.AlterColumn<string>(
                name: "SegmentId",
                table: "PlaneSegments",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Segments",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments",
                column: "PlaneId",
                principalTable: "Planes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaneSegments_Segments_SegmentId",
                table: "PlaneSegments");

            migrationBuilder.DropForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Segments",
                table: "Segments");

            migrationBuilder.RenameTable(
                name: "Segments",
                newName: "Segment");

            migrationBuilder.RenameIndex(
                name: "IX_Segments_PlaneId",
                table: "Segment",
                newName: "IX_Segment_PlaneId");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentId",
                table: "PlaneSegments",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Segment",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Segment",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Segment",
                table: "Segment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaneSegments_Segment_SegmentId",
                table: "PlaneSegments",
                column: "SegmentId",
                principalTable: "Segment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Segment_Planes_PlaneId",
                table: "Segment",
                column: "PlaneId",
                principalTable: "Planes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
