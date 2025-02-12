import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ContactUsService } from '../../tools/services';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent  implements OnInit {

    contactForm: FormGroup = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    });

    constructor(private contactService: ContactUsService) {}

    ngOnInit() {

    }

    onSubmit() {
      if (this.contactForm.valid) {

        this.contactService.sendMessage(this.contactForm.value).subscribe(resp => {
          this.contactForm.reset();
          this.contactService.success('Message sent successfully')
        })

      }
    }
  }


