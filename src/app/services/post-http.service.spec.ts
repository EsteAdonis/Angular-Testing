import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostsService } from './post.service';
import { Post } from '../models/post';

describe('postService (HttpClientTestingModule)',()=> {
	let postsService: PostsService;
	let httpTestingController: HttpTestingController;

	const POSTS: Post[] = [
		{ userId: 1, id:90, title: 'Greek Gods', body: 'Prometeo'},
		{ userId: 1, id:91, title: 'Greek Gods', body: 'Eris'},
		{ userId: 1, id:92, title: 'Greek Gods', body: 'Dionisio'},
		{ userId: 1, id:93, title: 'Greek Gods', body: 'Atenea'},
		{ userId: 1, id:94, title: 'Greek Gods', body: 'Perseo'}
	];		

	beforeEach(() => {
		TestBed.configureTestingModule( {
			providers: [PostsService],
			imports: [HttpClientTestingModule]
		});

		postsService = TestBed.inject(PostsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	describe('getPosts()', () => {
		it('should return posts when getPosts is called', (done: DoneFn) => {
			postsService.getPosts().subscribe( data=> {
				expect(data).toEqual(POSTS);
				done();
			})
			const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/');
			request.flush(POSTS);
			expect(request.request.method).toBe('GET');
		})
	});

	describe('getPosts(postsId)', ()=> {
		it('should return single post when getPosts is called with postId', () => {
			postsService.getPosts(1).subscribe();

			const request = httpTestingController.expectOne(
													'https://jsonplaceholder.typicode.com/posts/1'
											);
			expect(request.request.method).toBe('GET');
			// No request should be made, so no method to check
		});

		afterEach(() => {
			httpTestingController.verify();
		})

	})
})
