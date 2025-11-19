import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
	standalone: true
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
	
	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.getPosts();
	}

	getPosts() {
		this.postsService.getPosts().subscribe (
			data => this.posts = data
		)
	}

	deletePost(post: Post) {
		this.posts = this.posts.filter( p => p.id != post.id);
		this.postsService.deletePost(post);
	}
}
