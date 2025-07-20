import { ColDef } from "ag-grid-community";
import BlogPost from "../../interfaces/HomePage";
import { trigger, transition, style, animate } from "@angular/animations";

export const POSTS = [
    {
        id: 1,
        title: 'Getting Started with Angular 17',
        excerpt: 'Angular 17 brings exciting new features including standalone components and improved performance.',
        author: 'John Doe',
        publishedDate: new Date('2024-01-15')
    },
    {
        id: 2,
        title: 'Mastering PrimeNG Components',
        excerpt: 'PrimeNG offers comprehensive UI components for Angular applications.',
        author: 'Jane Smith',
        publishedDate: new Date('2024-01-10')
    },
    {
        id: 3,
        title: 'Building Responsive Layouts',
        excerpt: 'Creating responsive web applications with modern CSS and Angular.',
        author: 'Mike Johnson',
        publishedDate: new Date('2024-01-05')
    },
    {
        id: 4,
        title: 'State Management with NgRx',
        excerpt: 'Managing application state effectively using NgRx and Redux patterns.',
        author: 'Sarah Wilson',
        publishedDate: new Date('2023-12-28')
    },
    {
        id: 5,
        title: 'Testing Angular Applications',
        excerpt: 'Best practices for unit testing and e2e testing in Angular.',
        author: 'David Brown',
        publishedDate: new Date('2023-12-20')
    },
    {
        id: 6,
        title: 'Angular Performance Tips',
        excerpt: 'Optimize your Angular apps with lazy loading and OnPush strategy.',
        author: 'Lisa Garcia',
        publishedDate: new Date('2023-12-15')
    }
]

export const MANU = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'About', icon: 'pi pi-info-circle' },
    { label: 'Contact', icon: 'pi pi-envelope' }
];

export const COLUMNS: ColDef<BlogPost>[] = [
    {
        headerName: 'Title',
        field: 'title',
        flex: 2,
        cellStyle: { 'font-weight': '600', 'color': 'var(--primary-color)' }
    },
    {
        headerName: 'Excerpt',
        field: 'excerpt',
        flex: 3,
        cellRenderer: (params: any) => {
            const excerpt = params.value || '';
            return excerpt.length > 200 ? `${excerpt.substring(0, 200)}...` : excerpt;
        }
    },
    {
        headerName: 'Author',
        field: 'author',
        flex: 1
    },
    {
        headerName: 'Published',
        field: 'publishedDate',
        flex: 1,
        valueFormatter: (params: any) => {
            return params.value ? new Date(params.value).toLocaleDateString() : '';
        }
    }
];
export const DEFAULT_COL_DEF = {
    sortable: true,
    filter: true,
    resizable: true
};

export const ANIMATION = [
    trigger('slideDown', [
        transition(':enter', [
            style({ transform: 'translateY(-20px)', opacity: 0 }),
            animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
            animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
        ])
    ])
]