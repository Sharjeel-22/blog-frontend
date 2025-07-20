import { Component, OnInit, signal, computed, Signal, inject } from '@angular/core';
import { ColDef, GridReadyEvent, GridApi, RowClickedEvent } from 'ag-grid-community';
import { MenuItem, MessageService } from 'primeng/api';
import BlogPost from '../../interfaces/HomePage';
import { ANIMATION, COLUMNS, DEFAULT_COL_DEF, MANU } from '../../model/home-models/post.model';
import { IMPORTS } from '../../model/home-models/post.imports';
import { PostsService } from '../../common/_service/_posts.service';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...IMPORTS],
  providers: [MessageService],
  animations: [...ANIMATION],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gridApi!: GridApi;
  isLoading = signal<boolean>(true);
  newsletterEmail = signal<string>('');
  showNewsletter = signal<boolean>(false);
  isSubscribing = signal<boolean>(false);
  showMobileMenu = signal<boolean>(false);
  currentFilter = signal<string>('all');
  searchText = signal<string>('');

  showBlogDetail = signal<boolean>(false);
  selectedBlogPost = signal<BlogPost | null>(null);

  showCreatePost = signal<boolean>(false);
  blogPosts = signal<BlogPost[]>([]);
  loadingError = signal<string | null>(null);

  _messageService = inject(MessageService);
  _postService = inject(PostsService);
  _authService = inject(AuthService);

  isLoggedIn = computed(() => this._authService.isAuthenticated());

  totalPosts: Signal<number> = computed(() => this.blogPosts().length);
  isValidEmailComputed = computed(() => {
    const email = this.newsletterEmail();
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  menuItems: MenuItem[] = MANU;

  footerMenuItems: MenuItem[] = [];
  categoryMenuItems: MenuItem[] = [];
  legalMenuItems: MenuItem[] = [];

  columnDefs: ColDef<BlogPost>[] = COLUMNS;
  defaultColDef: ColDef = DEFAULT_COL_DEF;

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.isLoading.set(true);
    this.loadingError.set(null);
    this._postService.getAllPosts().subscribe({
      next: (response) => {
        const posts = response.data || [];
        const mappedPosts = posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || post.summary,
          summary: post.summary,
          author: post.author ? `${post.author.firstName} ${post.author.lastName}` : '',
          authorObject: post.author,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          publishedDate: post.publishedDate,
          status: post.status,
          viewCount: post.viewCount || 0,
          likeCount: post.likeCount || 0,
          category: post.category,
          tags: post.tags,
          featuredImage: post.featuredImage
        }));

        this.blogPosts.set(mappedPosts);
        this.isLoading.set(false);
        if (this.gridApi) {
          this.gridApi.setGridOption('rowData', this.blogPosts());
          this.gridApi.refreshCells();
        }

        this._messageService.add({
          severity: 'success',
          summary: 'Posts Loaded',
          detail: `Successfully loaded ${posts.length} posts`,
          life: 3000
        });
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading.set(false);
        this.loadingError.set('Failed to load posts. Please try again.');

        this._messageService.add({
          severity: 'error',
          summary: 'Loading Failed',
          detail: 'Failed to load posts. Please check your connection and try again.',
          life: 5000
        });

        if (error.status === 401) {
          this._messageService.add({
            severity: 'warn',
            summary: 'Authentication Required',
            detail: 'Please login again to access posts.',
            life: 5000
          });
        }
      }
    });
  }

  onGridReady(params: GridReadyEvent<BlogPost>) {
    this.gridApi = params.api;
    if (this.blogPosts().length > 0) {
      this.gridApi.setGridOption('rowData', this.blogPosts());
    }
  }

  onRowClicked(event: RowClickedEvent<BlogPost>) {
    if (event.data) {
      this.openBlogPostDetail(event.data);
    }
  }

  openBlogPostDetail(post: BlogPost): void {
    this.selectedBlogPost.set(post);
    this.showBlogDetail.set(true);

    this._messageService.add({
      severity: 'info',
      summary: 'Post Opened',
      detail: `Opening "${post.title}" in detail view`,
      life: 2000
    });
  }

  closeBlogPostDetail(): void {
    this.showBlogDetail.set(false);
    this.selectedBlogPost.set(null);
  }

  onBlogDetailClose(): void {
    this.closeBlogPostDetail();
  }

  openCreatePost(): void {
    this.showCreatePost.set(true);
  }

  closeCreatePost(): void {
    this.showCreatePost.set(false);
  }

  onCreatePostClose(): void {
    this.closeCreatePost();
  }

  onPostCreated(newPost: BlogPost): void {
    const currentPosts = this.blogPosts();
    this.blogPosts.set([newPost, ...currentPosts]);

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.blogPosts());
      this.gridApi.refreshCells();
    }

    this._messageService.add({
      severity: 'success',
      summary: 'Post Created',
      detail: 'New post has been created successfully!',
      life: 3000
    });
  }

  onSearchClick() { }

  onQuickFilterChanged(): void {
    if (this.gridApi) {
      this.gridApi.setQuickFilter(this.searchText());
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu.update(value => !value);
  }

  onStartReading() {
    const gridElement = document.querySelector('.ag-theme-alpine');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubscribe() {
    this.showNewsletter.update(value => !value);
  }

  toggleNewsletter() {
    this.showNewsletter.update(value => !value);
  }

  closeNewsletter() {
    this.showNewsletter.set(false);
  }

  isValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onFilterClick() {
  }

  onSortClick() {
  }

  setFilter(filter: string) {
    this.currentFilter.set(filter);
  }

  refreshData() {
    this.loadAllPosts();
  }

  subscribeNewsletter() {
    if (!this.isValidEmailComputed()) return;

    this.isSubscribing.set(true);

    setTimeout(() => {
      this.isSubscribing.set(false);
      this.showNewsletter.set(false);
      this.newsletterEmail.set('');
      this._messageService.add({
        severity: 'success',
        summary: 'Subscribed!',
        detail: 'Successfully subscribed! Check your inbox for confirmation.',
        life: 4000
      });
    }, 2000);
  }

  retryLoadPosts(): void {
    this.loadAllPosts();
  }
}