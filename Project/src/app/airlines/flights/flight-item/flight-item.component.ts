import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.css']
})
export class FlightItemComponent implements OnInit {

  @Input() flight:Flight;
  closeResult = '';
  

  constructor( private modalService: NgbModal) { 
    
  }

  ngOnInit(): void {
  
    // this.thirdFormGroup = this._formBuilder.group({
    //   passengers: this._formBuilder.array([
    //     this._formBuilder.group({
    //       'seat':[''],
    //       'firstName':[''],
    //       'lastName':[''],
    //       'passport': ['']
    //     })
    //   ])
    // });
    // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.required]
    // });

   
  
  }

 

  


  moreInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
