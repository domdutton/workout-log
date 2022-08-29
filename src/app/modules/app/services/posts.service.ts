import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { where } from '@angular/fire/firestore';
import { nanoid } from 'nanoid';
import { Post } from 'src/app/interfaces/post.interface';
import { DBService } from 'src/app/services/db-service.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
    constructor(
      private readonly auth: Auth,
      private readonly dbService: DBService
    ) {}
  
    getAllPosts() {
      return this.dbService.find('Posts', where("id", "!=", ""));
    }
  
    get(id: string) {
      return this.dbService.get<Post>('Posts', id);
    }
  
    deletePost(id: string) {
      return this.dbService.delete('Posts', id);
    }
  
    createNewPost({ title, content }: Post) {
      return this.dbService.create<Post>('Posts', {
        id: nanoid(),
        author: this.auth.currentUser?.uid!,
        title: title,
        content: content,
        likes: [],
        dislikes: [],
        posted: new Date(),
        edited: new Date()
      });
    }
}
