export class Segment {
    id :number;
    name :string;
    rows :number
    columns:number;

    constructor(name:string, rows:number, columns:number){
        this.name=name;
        this.rows=rows;
        this.columns=columns;
    }
}
