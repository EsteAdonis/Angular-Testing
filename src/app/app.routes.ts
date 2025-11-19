import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


export const routes: Routes = [
	{ path: 'posts', component: PostsComponent },
	{ path: 'detaial/:id', component: PostDetailComponent }
];
