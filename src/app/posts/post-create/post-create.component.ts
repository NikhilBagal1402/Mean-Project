import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PostService } from '../post.service';
import { Post } from '../post.modal';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule,
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
  form:FormGroup;
  imagePreview:string;

  constructor(public postService:PostService ,public route:ActivatedRoute){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'title' : new FormControl(null , { validators : [Validators.required ,Validators.minLength(3)]}),
      'content' : new FormControl(null , {validators :[Validators.required]}),
      'image': new FormControl(null , 
        { validators:[Validators.required],
          asyncValidators:[mimeType]
        })

    });
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id:postData._id , title:postData.title , content: postData.content };
          this.form.setValue(
            { title:this.post.title ,content :this.post.content}
          )
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onImagePick(event:Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === "create"){
      this.postService.addPost(this.form.value.title,this.form.value.content);
    } else {
      this.postService.updatePost(this.postId ,this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }
}
