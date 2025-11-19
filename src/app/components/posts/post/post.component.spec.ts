import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Post } from '../../../models/post';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
	// ComponentFixture is a test harness = instrumento de pruebas
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
		// TestBed => Configures and initializes environment for unit testing and 
		// provides methods for creating components and services in unit tests.
    await TestBed.configureTestingModule({
      imports: [PostComponent],
			providers: [
				{ provide: ActivatedRoute, useValue: {} }
			]			
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise an event when the delete post is clicked', () => {
    const post: Post = {userId: 1, id: 1, body: 'body 1', title: 'dsdsd'};
    component.post = post; // assign the post to the component if needed

    component.delete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

		component.onDeletePost(new MouseEvent('click'));
  })

	it('should render the post title in the anchor element', () => {
		const post: Post = {userId: 1, id: 1, body: 'body 1', title: 'Greek Gods'};
		component.post = post;
		fixture.detectChanges();
		const postElement: HTMLElement = fixture.nativeElement;
		const a = postElement.querySelector('a');
		expect(a?.textContent).toContain(post.title);
	})
});
