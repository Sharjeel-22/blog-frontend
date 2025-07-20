import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AgGridAngular } from "ag-grid-angular";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { PanelModule } from "primeng/panel";
import { ToastModule } from 'primeng/toast';
import { BlogPostDetailComponent } from "../../components/blog-post-detail/blog-post-detail.component";
import { CreatePostComponent } from "../../components/create-post/create-post.component";
import { ProfileDropdownComponent } from "../../components/profile-dropdown/profile-dropdown.component";

export const IMPORTS = [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MenubarModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenuModule,
    DividerModule,
    ToastModule,
    BlogPostDetailComponent,
    CreatePostComponent,
    ProfileDropdownComponent
]