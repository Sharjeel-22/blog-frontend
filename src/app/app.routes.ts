// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogPostDetailComponent } from './components/blog-post-detail/blog-post-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { authGuard } from './common/guards/auth.guard';
import { loginGuard } from './common/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Sign In - PrimeLand',
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register - PrimeLand',
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home - PrimeLand',
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us - PrimeLand',
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us - PrimeLand',
    canActivate: [authGuard]
  },
  {
    path: 'post-detail',
    component: BlogPostDetailComponent,
    title: 'Blog Post - PrimeLand',
    canActivate: [authGuard]
  },
  {
    path: 'post-detail/:id',
    component: BlogPostDetailComponent,
    title: 'Blog Post - PrimeLand',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];