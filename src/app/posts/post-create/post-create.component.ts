import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { PostService } from '../post.service';
import { Post } from '../post.modal';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatInputModule, MatCardModule,
    MatFormField,MatFormFieldModule,CommonModule
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {
  eneteredTitle = '';
  enteredContent  = '';
  private mode = 'create';
  private postId:string;
  public post:Post;

  constructor(public postService:PostService ,public route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId').toString();
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
