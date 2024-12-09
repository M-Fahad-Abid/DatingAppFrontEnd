import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.reactiveForm();
  }

  //method for reactive form
  reactiveForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl('Jake etc ....', Validators.required),
      password: new FormControl('', [Validators.required, Validators.min(8)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValue('password'),
      ]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  //my attempt
  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchControl = parent.get(matchTo);
      if (!matchControl) return null;

      const isMatch = control.value === matchControl.value;

      return isMatch ? null : { matchError: true };
    };
  }

  //tutorial one
  // matchValue(data: any): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     return control.value === control.parent?.get(data)?.value
  //       ? null
  //       : { isMatch: true };
  //   };
  // }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe({
    //   next: (response) => {
    //     this.toastr.success('Registered', 'Registration Successful');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     this.router.navigateByUrl('/');
    //   },
    // });
  }

  cancel() {
    console.log('cancel clicked');
    this.router.navigateByUrl('/');
  }
}
