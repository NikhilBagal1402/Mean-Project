import { Component } from '@angular/core';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule ,FormsModule, Form, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatInputModule , MatCardModule, ReactiveFormsModule ,FormsModule,MatButtonModule,
    MatFormField,MatFormFieldModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isLoading = false;

  onSignup(form : NgForm){
    console.log(form)
  }
}
