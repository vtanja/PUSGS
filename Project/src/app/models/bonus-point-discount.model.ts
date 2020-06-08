export class BonusPointDiscount{
   Id:number;
   MinPoints:number;
   MaxPoints:number;
   Discount:number;

   constructor(id:number,minPoints:number,maxPoints:number,discount:number){
     this.Id =id;
     this.MinPoints =minPoints;
     this.MaxPoints =maxPoints;
     this.Discount =discount;
   }
}
