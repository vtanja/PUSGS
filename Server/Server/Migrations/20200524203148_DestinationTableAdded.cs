using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class DestinationTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirlineDestinations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Destination",
                table: "Destination");

            migrationBuilder.RenameTable(
                name: "Destination",
                newName: "Destinations");

            migrationBuilder.AddColumn<int>(
                name: "AirlinId",
                table: "Destinations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Destinations",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Destinations",
                table: "Destinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinations_AirlineId",
                table: "Destinations",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinations_Airlines_AirlineId",
                table: "Destinations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Destinations",
                table: "Destinations");

            migrationBuilder.DropIndex(
                name: "IX_Destinations_AirlineId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "AirlinId",
                table: "Destinations");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Destinations");

            migrationBuilder.RenameTable(
                name: "Destinations",
                newName: "Destination");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Destination",
                table: "Destination",
                column: "DestinationId");

            migrationBuilder.CreateTable(
                name: "AirlineDestinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirlineId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineDestinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AirlineDestinations_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AirlineDestinations_Destination_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destination",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirlineDestinations_AirlineId",
                table: "AirlineDestinations",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineDestinations_DestinationId",
                table: "AirlineDestinations",
                column: "DestinationId");
        }
    }
}
