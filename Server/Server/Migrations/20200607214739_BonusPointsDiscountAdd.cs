using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class BonusPointsDiscountAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BonusPointsDiscounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MinPoints = table.Column<int>(nullable: false),
                    MaxPoints = table.Column<int>(nullable: false),
                    Discount = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusPointsDiscounts", x => x.Id);
                });
            migrationBuilder.InsertData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 1, 150, 0 });
            migrationBuilder.InsertData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 151, 300, 0 });
            migrationBuilder.InsertData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 301, 450, 0 });
            migrationBuilder.InsertData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 451, 100000000, 0 });
            
           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BonusPointsDiscounts");

            migrationBuilder.DeleteData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 1, 150, 0 });
            migrationBuilder.DeleteData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 151, 300, 0 });
            migrationBuilder.DeleteData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 301, 450, 0 });
            migrationBuilder.DeleteData("BonusPointsDiscounts", new[] { "MinPoints", "MaxPoints", "Discount" }, new object[] { 451, 100000000, 0 });
        }
    }
}
