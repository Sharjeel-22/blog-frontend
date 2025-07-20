import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { Post, CreatePostRequest, PostQueryParams, PostsResponse, UpdatePostRequest } from '../../interfaces/HomePage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly API_URL = environment.apiUrl;
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();

  private currentPostSubject = new BehaviorSubject<Post | null>(null);
  public currentPost$ = this.currentPostSubject.asObservable();
  private _authService = inject(AuthService);
  private http = inject(HttpClient);

  createPost(postData: CreatePostRequest): Observable<Post> {
    const url = `${this.API_URL}/posts`;
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Post>(url, postData, { headers }).pipe(
      tap(newPost => {
        const currentPosts = this.postsSubject.value;
        this.postsSubject.next([newPost, ...currentPosts]);
      })
    );
  }

  getAllPosts(params?: PostQueryParams): Observable<PostsResponse> {
    const url = `${this.API_URL}/posts`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof PostQueryParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PostsResponse>(url, { params: httpParams }).pipe(
      tap(response => {
        this.postsSubject.next(response.data);
      })
    );
}

  getPublishedPosts(params?: PostQueryParams): Observable<PostsResponse> {
    const url = `${this.API_URL}/posts/published`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof PostQueryParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PostsResponse>(url, { params: httpParams });
  }

  getMyPosts(params?: PostQueryParams): Observable<PostsResponse> {
    const url = `${this.API_URL}/posts/my-posts`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof PostQueryParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PostsResponse>(url, { params: httpParams });
  }

  getMyDrafts(params?: PostQueryParams): Observable<PostsResponse> {
    const url = `${this.API_URL}/posts/my-drafts`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof PostQueryParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PostsResponse>(url, { params: httpParams });
  }

  getPostsByAuthor(authorId: string, params?: PostQueryParams): Observable<PostsResponse> {
    const url = `${this.API_URL}/posts/author/${authorId}`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof PostQueryParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<PostsResponse>(url, { params: httpParams });
  }

  getPostById(id: string): Observable<Post> {
    const url = `${this.API_URL}/posts/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(post => {
        this.currentPostSubject.next(post);
      })
    );
  }

  likePost(id: string): Observable<{ message: string }> {
    const url = `${this.API_URL}/posts/${id}/like`;
    return this.http.post<{ message: string }>(url, {}).pipe(
      tap(() => {
        // Update like count in the current posts list
        this.updatePostLikeCount(id, 1);
      })
    );
  }

  unlikePost(id: string): Observable<{ message: string }> {
    const url = `${this.API_URL}/posts/${id}/like`;
    return this.http.delete<{ message: string }>(url).pipe(
      tap(() => {
        this.updatePostLikeCount(id, -1);
      })
    );
  }

  searchPosts(searchTerm: string, params?: PostQueryParams): Observable<PostsResponse> {
    const searchParams = {
      ...params,
      search: searchTerm
    };
    return this.getAllPosts(searchParams);
  }

  getPostsByCategory(category: string, params?: PostQueryParams): Observable<PostsResponse> {
    const categoryParams = {
      ...params,
      category: category
    };
    return this.getAllPosts(categoryParams);
  }

  getPostsByTag(tag: string, params?: PostQueryParams): Observable<PostsResponse> {
    const tagParams = {
      ...params,
      tag: tag
    };
    return this.getAllPosts(tagParams);
  }

  clearCurrentPost(): void {
    this.currentPostSubject.next(null);
  }

  clearPosts(): void {
    this.postsSubject.next([]);
  }

  private updatePostLikeCount(id: string, increment: number): void {
    const currentPosts = this.postsSubject.value;
    const updatedPosts = currentPosts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likeCount: Math.max(0, post.likeCount + increment)
        };
      }
      return post;
    });
    this.postsSubject.next(updatedPosts);

    const currentPost = this.currentPostSubject.value;
    if (currentPost && currentPost.id === id) {
      this.currentPostSubject.next({
        ...currentPost,
        likeCount: Math.max(0, currentPost.likeCount + increment)
      });
    }
  }

  getCurrentPosts(): Post[] {
    return this.postsSubject.value;
  }

  getCurrentPost(): Post | null {
    return this.currentPostSubject.value;
  }
}