import { Component, OnInit, Input } from '@angular/core';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RentCarOfficesService } from 'src/app/services/rent-car-offices.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css'],
})
export class OfficesEditComponent implements OnInit {
  offices: {};
  addOfficeForm: FormGroup;
  closeResult: string;

  constructor(
    private rentCarAdminService: RentCarAdministratorService,
    private modalService: NgbModal,
    private officesService: RentCarOfficesService
  ) {
    this.addOfficeForm = new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.modalService.dismissAll();
    this.officesService.getOffices().subscribe(
      (res) => {
        this.offices = res;
      },
      (err) => {}
    );
  }

  openModal(content) {
    this.addOfficeForm.reset();

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title-adm',
        centered: true,
        backdropClass: 'light-purple-backdrop',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  addOffice() {

    let data = this.addOfficeForm.value;
    let address = {'address' : data};

    this.officesService.addOffice(address).subscribe(
      res=>{

        this.modalService.dismissAll();
        console.log(res);
        this.updateOfficesAdd(res);

        Swal.fire({
          text : 'Office successfully added',
          showConfirmButton:false,
          icon : 'success',
          timer:2000
        });
        this.addOfficeForm.reset();
      },
      err=>{
        console.log(err);
        Swal.fire({
          text : err.errors.message,
          showConfirmButton:true,
          icon : 'error'
        });
      }
    )

  }

  updateOfficesAdd(office:{}){
    if(this.offices[office['country']]===undefined){
      let arr = []
      arr.push(office);
      this.offices[office['country']] = arr;
    }else{
      this.offices[office['country']].push(office);
    }
  }

  officesEmpty():boolean{

    return (Object.keys(this.offices).length===0 || this.offices===undefined);
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
