import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-a-car-add',
  templateUrl: './rent-a-car-add.component.html',
  styleUrls: ['./rent-a-car-add.component.css'],
})
export class RentACarAddComponent implements OnInit {
  dataForm: FormGroup;
  imgPreview: string | ArrayBuffer;

  constructor(private rentCarService: RentCarService, private router: Router) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        number: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
      }),
      description: new FormControl(null, Validators.required),
      file: new FormControl('', ),
      fileSource: new FormControl('', ),
      logo: new FormControl('', )
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type.match('image/*') == null) {
        console.log('Not supported');
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgPreview = reader.result;
      };

      this.dataForm.patchValue({
        fileSource: file,
        logo:reader.result
      });
    }
  }

  addCompany() {
    let data = this.dataForm.value;
    delete data['file'];
    delete data['fileSource'];

    this.rentCarService.addCompany(data).subscribe(
      (res) => {
        this.dataForm.reset();
        Swal.fire({
          text: "Company main data added!Let's add offices!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });

        this.rentCarService.firstCompanyAdded.next(true);
        this.router.navigateByUrl('/company-data/edit-offices');
      },
      (err) => {
        Swal.fire({
          text: err.error.message,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#de8e26',
        });
      }
    );
  }
}
