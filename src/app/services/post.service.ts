import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
	constructor(private http: HttpClient) {};

	getPosts(): Observable<Post[]>;
	getPosts(postId: number): Observable<Post>;
	getPosts(postId?: number): Observable<Post[] | Post> {
		if (postId !== undefined) {
			return this.http.get<Post>(
				`https://jsonplaceholder.typicode.com/posts/${postId}`
			);
		} else {
			return this.http.get<Post[]>(
				`https://jsonplaceholder.typicode.com/posts/`
			);
		}
	}


	deletePost(post: Post) {
		return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
	}

	updatePost(post: Post) {
		return this.http.put(
			`https://jsonplaceholder.typicode.com/posts/${post.id}`, post
		)
	}
}
