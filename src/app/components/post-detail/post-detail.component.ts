import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from 	'@angular/forms';

@Component({
  selector: 'app-post-detail.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
	post!: Post;
  constructor(private route: ActivatedRoute, 
							private postsService: PostsService, 
							private location: Location) {}

  ngOnInit(): void {
		this.getPosts();
  }

	getPosts() {
		const id = this.route.snapshot.paramMap.get('id');
		id && this.postsService.getPosts(+id).subscribe( 
			post => this.post = post
		)
	}

	goBack() {
		this.location.back();
	}

	save() {
		this.postsService.updatePost(this.post).subscribe(
			() => this.goBack()
		);
	}


}
