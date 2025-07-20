import { Component, signal, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PROFILE_IMPORTS } from '../../model/profile-models/profile-imports';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [...PROFILE_IMPORTS],
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent {
  private _messageService = inject(MessageService);
  _router = inject(Router);

  currentUser = signal({
    name: 'Sharjeel Rajpoot',
    email: 'sharjeel@example.com',
    role: 'Author',
    avatar: '',
    isOnline: true
  });

  profileMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.onProfileClick()
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.onSettingsClick()
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-line',
      command: () => this.onDashboardClick()
    },
    {
      separator: true
    },
    {
      label: 'My Posts',
      icon: 'pi pi-file-edit',
      command: () => this.onMyPostsClick()
    },
    {
      label: 'Bookmarks',
      icon: 'pi pi-bookmark',
      command: () => this.onBookmarksClick()
    },
    {
      separator: true
    },
    {
      label: 'Help & Support',
      icon: 'pi pi-question-circle',
      command: () => this.onHelpClick()
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      styleClass: 'logout-item',
      command: () => this.onLogout()
    }
  ];

  getUserInitials(): string {
    return this.currentUser().name
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  onProfileClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Profile',
      detail: 'Opening profile page...',
      life: 3000
    });
  }

  onSettingsClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Settings',
      detail: 'Opening settings...',
      life: 3000
    });
  }

  onDashboardClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Dashboard',
      detail: 'Navigating to dashboard...',
      life: 3000
    });
  }

  onMyPostsClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'My Posts',
      detail: 'Loading your posts...',
      life: 3000
    });
  }

  onBookmarksClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Bookmarks',
      detail: 'Loading bookmarked posts...',
      life: 3000
    });
  }

  onHelpClick(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Help',
      detail: 'Opening help center...',
      life: 3000
    });
  }

  onLogout(): void {
    localStorage.removeItem('blog_auth_token');
    localStorage.removeItem('currentUser');
    this._messageService.add({
      severity: 'success',
      summary: 'Logged Out',
      detail: 'You have been successfully logged out.',
      life: 4000
    });

    this._router.navigate(['/login']).then((success) => {
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
}