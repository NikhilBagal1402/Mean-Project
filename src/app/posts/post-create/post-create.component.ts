import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PostService } from '../post.service';
import { Post } from '../post.modal';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatInputModule, MatCardModule,
    MatFormField,MatFormFieldModule,CommonModule,MatProgressSpinnerModule
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
  isLoading = false;

  constructor(public postService:PostService ,public route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id:postData._id , title:postData.title , content: postData.content };
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === "create"){
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId ,form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
