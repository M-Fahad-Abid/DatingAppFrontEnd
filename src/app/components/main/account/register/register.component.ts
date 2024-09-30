import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  onSubmit(_t14: NgForm) {
    throw new Error('Method not implemented.');
  }
  onReset() {
    throw new Error('Method not implemented.');
  }
  formData: any;
}
