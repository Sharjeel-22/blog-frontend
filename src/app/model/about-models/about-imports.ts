import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { DividerModule } from "primeng/divider";
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from "primeng/progressbar";
import { TabViewModule } from "primeng/tabview";
import { TimelineModule } from "primeng/timeline";

export const ABOUT_IMPORTS = [
    CommonModule,
    CardModule,
    ButtonModule,
    TimelineModule,
    PanelModule,
    TabViewModule,
    ChartModule,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    AgGridModule
]