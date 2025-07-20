import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";

export const LOGIN_IMPORTS = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    DividerModule,
    CardModule,
    RippleModule,
    PanelModule
]