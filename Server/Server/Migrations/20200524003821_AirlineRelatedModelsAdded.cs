using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class AirlineRelatedModelsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_CarRate_Cars_CarId",
            //    table: "CarRate");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_CarRate_Users_UserId",
            //    table: "CarRate");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_CarReservation_CarRate_CarRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_CarReservation_CompanyRate_CompanyRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_CompanyRate_Users_UserId",
            //    table: "CompanyRate");

            //migrationBuilder.DropIndex(
            //    name: "IX_CompanyRate_CompanyId",
            //    table: "CompanyRate");

            //migrationBuilder.DropIndex(
            //    name: "IX_CompanyRate_UserId",
            //    table: "CompanyRate");

            //migrationBuilder.DropIndex(
            //    name: "IX_CarReservation_CarRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropIndex(
            //    name: "IX_CarReservation_CompanyRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropIndex(
            //    name: "IX_CarRate_UserId",
            //    table: "CarRate");

            //migrationBuilder.DropColumn(
            //    name: "Doors",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "HasAirCondition",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "HasAutomationGearbox",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "Id",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "PassengersNumber",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "Rate",
            //    table: "RentCarAdmins");

            //migrationBuilder.DropColumn(
            //    name: "CompanyId",
            //    table: "CompanyRate");

            //migrationBuilder.DropColumn(
            //    name: "UserId",
            //    table: "CompanyRate");

            //migrationBuilder.DropColumn(
            //    name: "CarRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropColumn(
            //    name: "CompanyRateId",
            //    table: "CarReservation");

            //migrationBuilder.DropColumn(
            //    name: "UserId",
            //    table: "CarRate");

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "AirlineAdmins",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Airlines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Rate = table.Column<int>(nullable: false),
                    Logo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airlines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Airlines_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Airlines_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Destination",
                columns: table => new
                {
                    DestinationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(nullable: false),
                    Country = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destination", x => x.DestinationId);
                });

            migrationBuilder.CreateTable(
                name: "Segment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Rows = table.Column<int>(nullable: false),
                    Columns = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Segment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Planes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(nullable: true),
                    AirlineId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Planes_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AirlineDestinations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirlineId = table.Column<int>(nullable: false),
                    DestinationId = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "PlaneSegments",
                columns: table => new
                {
                    PlaneSegmentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaneId = table.Column<int>(nullable: false),
                    SegmentId = table.Column<int>(nullable: false)
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
                        name: "FK_PlaneSegments_Segment_SegmentId",
                        column: x => x.SegmentId,
                        principalTable: "Segment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirlineAdmins_AirlineId",
                table: "AirlineAdmins",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineDestinations_AirlineId",
                table: "AirlineDestinations",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineDestinations_DestinationId",
                table: "AirlineDestinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_AddressId",
                table: "Airlines",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_OwnerId",
                table: "Airlines",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Planes_AirlineId",
                table: "Planes",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaneSegments_PlaneId",
                table: "PlaneSegments",
                column: "PlaneId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaneSegments_SegmentId",
                table: "PlaneSegments",
                column: "SegmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineAdmins_Airlines_AirlineId",
                table: "AirlineAdmins",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_CarRate_Cars_CarId",
            //    table: "CarRate",
            //    column: "CarId",
            //    principalTable: "Cars",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineAdmins_Airlines_AirlineId",
                table: "AirlineAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate");

            migrationBuilder.DropTable(
                name: "AirlineDestinations");

            migrationBuilder.DropTable(
                name: "PlaneSegments");

            migrationBuilder.DropTable(
                name: "Destination");

            migrationBuilder.DropTable(
                name: "Planes");

            migrationBuilder.DropTable(
                name: "Segment");

            migrationBuilder.DropTable(
                name: "Airlines");

            migrationBuilder.DropIndex(
                name: "IX_AirlineAdmins_AirlineId",
                table: "AirlineAdmins");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "AirlineAdmins");

            migrationBuilder.AddColumn<int>(
                name: "Doors",
                table: "RentCarAdmins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "HasAirCondition",
                table: "RentCarAdmins",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasAutomationGearbox",
                table: "RentCarAdmins",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "RentCarAdmins",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "PassengersNumber",
                table: "RentCarAdmins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rate",
                table: "RentCarAdmins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "CompanyRate",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CompanyRate",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CarRateId",
                table: "CarReservation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyRateId",
                table: "CarReservation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CarRate",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRate_CompanyId",
                table: "CompanyRate",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRate_UserId",
                table: "CompanyRate",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_CarRateId",
                table: "CarReservation",
                column: "CarRateId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_CompanyRateId",
                table: "CarReservation",
                column: "CompanyRateId");

            migrationBuilder.CreateIndex(
                name: "IX_CarRate_UserId",
                table: "CarRate",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Cars_CarId",
                table: "CarRate",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarRate_Users_UserId",
                table: "CarRate",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_CarRate_CarRateId",
                table: "CarReservation",
                column: "CarRateId",
                principalTable: "CarRate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_CompanyRate_CompanyRateId",
                table: "CarReservation",
                column: "CompanyRateId",
                principalTable: "CompanyRate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRate_Users_UserId",
                table: "CompanyRate",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
