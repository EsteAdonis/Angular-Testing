import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { PostsService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

	let mockActivatedRoute = {
		snapshot: {
			paramMap: {
				get: () => { return '3'}
			}
		}
	};

	let mockPostService = jasmine.createSpyObj(['getPosts', 'updatePost'])
	let mockLocation = jasmine.createSpyObj(['back'])

  beforeEach(async () => {
		mockPostService.getPosts.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
			providers: [
				{ provide: Location, useValue: mockLocation },
				{ provide: PostsService, useValue: mockPostService },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute}
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('should render the post title in h2 template', () => {
		const mockPost = {
			id: 3,
			title: 'Title 1',
			body: 'Body 1'
		} as Post;

		mockPostService.getPosts.and.returnValue(of(mockPost)); // Return as array if expected

		component.ngOnInit(); // or call the method that loads the post
		fixture.detectChanges();

		const h2DebugElement = fixture.debugElement.query(By.css('h2'));
		expect(h2DebugElement).not.toBeNull(); // Ensure the h2 element exists

		const element = h2DebugElement.nativeElement as HTMLElement;
		expect(element.textContent).toBe(component.post.title);

		// This is another way to get the h2 HTMLElement
		const h22DebugElement = fixture.nativeElement.querySelector('h2') as HTMLElement;
		expect(h22DebugElement).not.toBeNull(); // Ensure the h2 element exists
		expect(h22DebugElement.textContent).toBe(component.post.title);
	})

});