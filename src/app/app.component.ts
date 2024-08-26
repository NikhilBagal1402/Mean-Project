import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from './posts/post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostCreateComponent, FormsModule, HeaderComponent,PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}

