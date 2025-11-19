import { TestBed } from '@angular/core/testing';
import { PostsService } from './post.service';
import { HttpClient } from 	'@angular/common/http';
import { Post } from '../models/post';
import { of } from 'rxjs';

describe('PostsService (HttpClient)', () => {
  let service: PostsService;
	// jasmine.SpyObj<HttpClient>;
	let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']); 

	const POSTS: Post[] = [
		{ userId: 1, id:90, title: 'Greek Gods', body: 'Prometeo'},
		{ userId: 1, id:91, title: 'Greek Gods', body: 'Eris'},
		{ userId: 1, id:92, title: 'Greek Gods', body: 'Dionisio'},
		{ userId: 1, id:93, title: 'Greek Gods', body: 'Atenea'},
		{ userId: 1, id:94, title: 'Greek Gods', body: 'Perseo'}
	];	

  beforeEach(() => {
    TestBed.configureTestingModule({
			providers: [
				 PostsService, { provide: HttpClient, useValue: httpClientSpy } 
			]
		});
    service = TestBed.inject(PostsService);
  });

	// httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
	httpClientSpy.get.and.returnValue(of(POSTS));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should return expected posts when getposts is called', () => {
		service.getPosts().subscribe({
			next: data => expect(data).toEqual(POSTS),
			error: (e) => console.log(e)
		})
		expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
	})
});
