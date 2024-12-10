import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
import { CommonModule, JsonPipe } from '@angular/common';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    JsonPipe,
    CommonModule,
    TextInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.reactiveForm();
  }

  //method for reactive form
  reactiveForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: ['', [Validators.required, this.matchValue('password')]],
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
