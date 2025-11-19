import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [CommonModule, RouterModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
	standalone: true
})
export class PostComponent {
	@Input() post: Post | undefined;
	@Output() delete = new EventEmitter<Post>();

	onDeletePost(event: Event) {
		event.stopPropagation;
		this.delete.emit(this.post);
	}
}
