import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  form: FormGroup;
  posts: Array<Post> = [];
  showModal: boolean = false;

    constructor(
      private readonly postsService: PostsService,
      private readonly authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router
    ) {
    this.form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(1)]],
    content: ['', [Validators.required, Validators.minLength(1)]],
  });
}

get title() {
  return this.form.get('title');
}

get content() {
  return this.form.get('content');
}

  ngOnInit(): void {
    this.postsService
      .getAllPosts()
      .then((posts) =>
        posts.forEach((post) => this.posts.push(post.data() as Post))
      )
      .catch((e) => console.error(e));
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  async getUser(id: string) {
    return (await this.authService.getUser(id)) as User;
  }

  onSubmit() {
    this.postsService
      .createNewPost(this.form.value)
      .then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['plans']));
      })
      .catch((e) => console.log(e.message));
  }
}
