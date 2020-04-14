import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-offices',
  templateUrl: './profile-offices.component.html',
  styleUrls: ['./profile-offices.component.css']
})
export class ProfileOfficesComponent implements OnInit {

  @Input('items') items:{};

  destinations:number;
  isCollapsed:boolean[];
  lastCollapse:number=-1;
  offices:any;

  images:{};

  constructor() {
  }

  ngOnInit(): void {

    this.setImages();

    this.isCollapsed = new Array<boolean>();
      var j=0;
      for( var i in this.items ){
        this.isCollapsed[j]=true;
        j++;
      }
  }

  onClick(id:number):void{

    if(this.lastCollapse!=-1 && this.lastCollapse!=id){
      this.isCollapsed[this.lastCollapse]=true;
    }

      this.isCollapsed[id]=!this.isCollapsed[id];
      this.lastCollapse=id;
  }

  setImages(){

    this.images={
      'Belgrade' : "../../../assets/images/cities/Belgrade.jpg",
      'Nis' : "../../../assets/images/cities/Nis.jpg",
      'Kragujevac' : "../../../assets/images/cities/Kragujevac.jpg",
      'Novi Sad' : "../../../assets/images/cities/NoviSad.jpg",
      'Dubrovnik' : "../../../assets/images/cities/Dubrovnik.jpg",
      'Split' : "../../../assets/images/cities/Split.jpg",
      'Zagreb' : "../../../assets/images/cities/Zagreb.jpg",
      'Graz' : "../../../assets/images/cities/Graz.jpg",
      'Linz' : "../../../assets/images/cities/Linz.jpg",
      'Salzburg' : "../../../assets/images/cities/Salzburg.jpg",
      'Osijek' : "../../../assets/images/cities/Osijek.jpg",
      'Zadar' : "../../../assets/images/cities/Zadar.jpg",
      'Podgorica' : "../../../assets/images/cities/Podgorica.jpg",
      'Budva' : "../../../assets/images/cities/Budva.jpg",
      'London' : "../../../assets/images/cities/London.jpg",
      'Birmingham' : "../../../assets/images/cities/Birmingham.jpg",
      'Liverpool' : "../../../assets/images/cities/Liverpool.jpg",
      'Leeds' : "../../../assets/images/cities/Leeds.jpg",
      'Kiev' : "../../../assets/images/cities/Kiev.jpg",
      'Manchester' : "../../../assets/images/cities/Manchester.jpg",
      'Madrid' : "../../../assets/images/cities/Madrid.jpg",
      'Malaga' : "../../../assets/images/cities/Malaga.jpg",
      'Barcelona' : "../../../assets/images/cities/Barcelona.jpg",
      'Cordoba' : "../../../assets/images/cities/Cordoba.jpg",
      'Berlin' : "../../../assets/images/cities/Berlin.jpg",
      'Munich' : "../../../assets/images/cities/Munich.jpg",
      'Cologne' : "../../../assets/images/cities/Cologne.jpg",
      'Frankfurt' : "../../../assets/images/cities/Frankfurt.jpg",
      'Budapest' : "../../../assets/images/cities/Budapest.jpg",
      'Trebinje' : "../../../assets/images/cities/Trebinje.jpg",
      'Banja Luka' : "../../../assets/images/cities/BanjaLuka.jpg",
      'Mostar' : "../../../assets/images/cities/Mostar.jpg",
      'Athens' : "../../../assets/images/cities/Athens.jpg",
      'Sarajevo' : "../../../assets/images/cities/Sarajevo.jpg",
      'Dusseldorf' : "../../../assets/images/cities/Dusseldorf.jpg",
      'Hamburg' : "../../../assets/images/cities/Hamburg.jpg",
      'Bologna' : "../../../assets/images/cities/Bologna.jpg",
      'Rome' : "../../../assets/images/cities/Rome.jpg",
      'Florence' : "../../../assets/images/cities/Florence.jpg",
      'Milan' : "../../../assets/images/cities/Milan.jpg",
      'Geneva' : "../../../assets/images/cities/Geneva.png",
      'Istanbul' : "../../../assets/images/cities/Istanbul.jpg",
      'Bari' : "../../../assets/images/cities/Bari.jfif",
      'Vienna' : "../../../assets/images/cities/Vienna.jpg",
      'Zurich' : "../../../assets/images/cities/Zurich.jpg",
      'Lion' : "../../../assets/images/cities/Lion.jpg",
      'Paris' : "../../../assets/images/cities/Paris.png",
      'Saint Petersburg' : "../../../assets/images/cities/Saint Petersburg.jpg",
      'Moscow' : "../../../assets/images/cities/Moscow.jpg",
      'Basel' : "../../../assets/images/cities/Basel.jpg",
      'Bilbao' : "../../../assets/images/cities/Bilbao.jpg",
      'Ibiza' : "../../../assets/images/cities/Ibiza.jpg",
      'Amsterdam' : "../../../assets/images/cities/Amsterdam.jpg",
      'Brussels' : "../../../assets/images/cities/Brussels.jpg",
    }

  }

}
