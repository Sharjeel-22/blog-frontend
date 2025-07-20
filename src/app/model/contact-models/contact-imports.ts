import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PanelModule } from "primeng/panel";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";

export const CONTACT_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    PanelModule,
    DividerModule,
    TabViewModule,
    AgGridModule
]