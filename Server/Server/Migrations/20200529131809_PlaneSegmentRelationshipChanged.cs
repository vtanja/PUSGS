using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class PlaneSegmentRelationshipChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments");

            migrationBuilder.DropTable(
                name: "PlaneSegments");

            migrationBuilder.AlterColumn<int>(
                name: "PlaneId",
                table: "Segments",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments",
                column: "PlaneId",
                principalTable: "Planes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments");

            migrationBuilder.AlterColumn<int>(
                name: "PlaneId",
                table: "Segments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "PlaneSegments",
                columns: table => new
                {
                    PlaneSegmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaneId = table.Column<int>(type: "int", nullable: false),
                    SegmentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaneSegments", x => x.PlaneSegmentId);
                    table.ForeignKey(
                        name: "FK_PlaneSegments_Planes_PlaneId",
                        column: x => x.PlaneId,
                        principalTable: "Planes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaneSegments_Segments_SegmentId",
                        column: x => x.SegmentId,
                        principalTable: "Segments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlaneSegments_PlaneId",
                table: "PlaneSegments",
                column: "PlaneId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaneSegments_SegmentId",
                table: "PlaneSegments",
                column: "SegmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Segments_Planes_PlaneId",
                table: "Segments",
                column: "PlaneId",
                principalTable: "Planes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
