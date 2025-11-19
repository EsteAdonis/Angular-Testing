import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { PostsService } from '../../services/post.service';
import { of } from 'rxjs';
import { Post	} from '../../models/post';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { PostComponent } from './post/post.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('PostsComponent', () => {
  let component: PostsComponent;
	// ComponentFixture is a test harness = instrumento de pruebas
  let fixture: ComponentFixture<PostsComponent>;
  let mockService = jasmine.createSpyObj('PostsService', ['getPosts', 'deletePost']);

  const POSTS: Post[] = [
    { userId: 1, id:90, title: 'Greek Gods', body: 'Prometeo'},
    { userId: 1, id:91, title: 'Greek Gods', body: 'Eris'},
    { userId: 1, id:92, title: 'Greek Gods', body: 'Dionisio'},
    { userId: 1, id:93, title: 'Greek Gods', body: 'Atenea'},
    { userId: 1, id:94, title: 'Greek Gods', body: 'Perseo'}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent, PostComponent],
			providers: [
				{ provide: PostsService, useValue: mockService},
				{ provide: ActivatedRoute, useValue: {} }				
			],
			schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

		mockService.getPosts.and.returnValue(of(POSTS));
		mockService.deletePost.and.returnValue(of(true));

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PostsComponent', () => {
    expect(component).toBeTruthy();
  });

	it('should return list of 5 Posts', fakeAsync( () => {
		mockService.getPosts.and.returnValue(of(POSTS));		
		tick();
    expect(component.posts.length).toBe(5);
	}));

	it('should call one the delete method', () => {
	  mockService.deletePost.calls.reset();		
		component.posts = POSTS;
		component.deletePost(POSTS[1]);
		expect(mockService.deletePost).toHaveBeenCalledTimes(1);
	})	

	it('should delete the selected Post from the posts and left 4 POSTS', () => {
    mockService.deletePost.calls.reset();		
		component.posts = POSTS;
		component.deletePost(POSTS[1]);
		expect(component.posts.length).toBe(4);
	})

	it('should create one post child Elemetn for each post', () => {
		mockService.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();
		const debugElement = fixture.debugElement;
		const postsElement = debugElement.queryAll(By.css('.posts'));
		expect(postsElement.length).toBe(POSTS.length);
	})

	it('should create exact same number of Post Component with Posts', () => {
		// The next line is a implicit execution at the before section
		// mockService.getPosts.and.returnValue(of(POSTS));		
		fixture.detectChanges();

		// Detect How many PostComponent (child components) has been created from PostsComponent.POSTS
		const PostComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
		expect(PostComponentDEs.length).toEqual(POSTS.length);
	})

	it('should check whether exact post is sending to PostComponent', ()=> {
		fixture.detectChanges();
		// By.directive look for the object with @Component ({}) directive
		const PostComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));

		PostComponentDEs.forEach((element, index) => {
			const post = (element.componentInstance as PostComponent).post!;
			expect(post.title).toEqual(POSTS[index].title);
		});
		let postComponentInstance = PostComponentDEs[0].componentInstance as PostComponent;

		expect(postComponentInstance.post!.title).toEqual(POSTS[0].title);
	});

	it('should call delete method when post component button is clicked', () => {
		spyOn(component, 'deletePost');
		mockService.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();

		let PostsComponentDEs = fixture.debugElement.queryAll(
			By.directive(PostComponent)
		);

		for (let i = 0; i < PostsComponentDEs.length; i++) {
			PostsComponentDEs[i]
					.query(By.css('button'))
					.triggerEventHandler('click', { preventDefault: () => {} });
			
			expect(component.deletePost).toHaveBeenCalledWith(POSTS[i]);
		}		
	});

	it('should call the delete method when the delete event is emitted in Post Component', () => {
		spyOn(component, 'deletePost');
		mockService.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();

		let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
		for(let i = 0; i < postComponentDEs.length; i++) {
			(postComponentDEs[i].componentInstance as PostComponent).delete.emit(POSTS[0])
			expect(component.deletePost).toHaveBeenCalledWith(POSTS[i])
		}
	})
});
