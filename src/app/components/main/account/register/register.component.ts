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
import { DatePickerComponent } from '../../../shared/date-picker/date-picker.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    JsonPipe,
    CommonModule,
    TextInputComponent,
    DatePickerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: [string] | undefined;

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.reactiveForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
      dateOfBirth: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
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

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({ dateOfBirth: dob });

    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Registered', 'Registration Successful');
        this.router.navigateByUrl('/user');
      },
      error: (err) => {
        this.validationErrors = err;
      },
    });
  }

  cancel() {
    console.log('cancel clicked');
    this.router.navigateByUrl('/');
  }

  private getDateOnly(dob: any) {
    if (!dob) return null;
    return new Date(dob).toISOString().slice(0, 10);
  }
}
