import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostDetailComponent } from './blog-post-detail.component';


describe('PostDetailComponent', () => {
  let component: BlogPostDetailComponent;
  let fixture: ComponentFixture<BlogPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlogPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
