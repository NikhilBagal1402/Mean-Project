import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatInputModule, MatCardModule,
    MatFormField,MatFormFieldModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  eneteredTitle = '';
  enteredContent  = '';

  constructor(public postService:PostService){}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
