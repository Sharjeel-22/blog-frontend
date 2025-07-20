import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ContactInfo, Office, ContactInquiry } from '../../interfaces/ContactPage';
import { CONTACT_IMPORTS } from '../../model/contact-models/contact-imports';
import { CONTACT_INFO, CONTACT_INQUERY, DEPARTMENT_OPTIONS, OFFICE } from '../../model/contact-models/contact-models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [...CONTACT_IMPORTS],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  currentDate = new Date();

  departmentOptions = signal(DEPARTMENT_OPTIONS);

  priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Urgent', value: 'urgent' }
  ];

  contactInfo: ContactInfo[] =CONTACT_INFO;

  offices: Office[] = OFFICE;

  contactInquiries: ContactInquiry[] = CONTACT_INQUERY;

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      width: 70,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Name',
      field: 'name',
      width: 150,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 200,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Subject',
      field: 'subject',
      width: 200,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Department',
      field: 'department',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const dept = this.departmentOptions().find(d => d.value === params.value);
        return dept ? dept.label : params.value;
      }
    },
    {
      headerName: 'Priority',
      field: 'priority',
      width: 100,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const colors = {
          'low': 'bg-blue-100 text-blue-800',
          'medium': 'bg-yellow-100 text-yellow-800',
          'high': 'bg-orange-100 text-orange-800',
          'urgent': 'bg-red-100 text-red-800'
        };
        const colorClass = colors[params.value as keyof typeof colors] || 'bg-gray-100 text-gray-800';
        return `<span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${params.value.toUpperCase()}</span>`;
      }
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const colors = {
          'open': 'bg-green-100 text-green-800',
          'in-progress': 'bg-blue-100 text-blue-800',
          'closed': 'bg-gray-100 text-gray-800'
        };
        const colorClass = colors[params.value as keyof typeof colors] || 'bg-gray-100 text-gray-800';
        return `<span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorClass}">${params.value.replace('-', ' ').toUpperCase()}</span>`;
      }
    },
    {
      headerName: 'Date Submitted',
      field: 'dateSubmitted',
      width: 140,
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params: any) => new Date(params.value).toLocaleDateString()
    },
    {
      headerName: 'Assigned To',
      field: 'assignedTo',
      width: 140,
      sortable: true,
      filter: true
    },
    {
      headerName: 'Actions',
      width: 120,
      cellRenderer: (params: any) => {
        return `
          <div class="flex gap-1">
            <button class="p-button-rounded p-button-text p-button-sm view-btn" title="View Details">
              <i class="pi pi-eye"></i>
            </button>
            <button class="p-button-rounded p-button-text p-button-sm edit-btn" title="Edit">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        `;
      }
    }
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    pagination: true,
    paginationPageSize: 10,
    rowHeight: 50,
    onCellClicked: (event) => {
      if (event.event?.target && (event.event.target as HTMLElement).closest('.view-btn')) {
        this.viewInquiry(event.data);
      } else if (event.event?.target && (event.event.target as HTMLElement).closest('.edit-btn')) {
        this.editInquiry(event.data);
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      department: ['general', Validators.required],
      priority: ['medium', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      preferredContactDate: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      setTimeout(() => {
        this.isSubmitting = false;

        const newInquiry: ContactInquiry = {
          id: this.contactInquiries.length + 1,
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          subject: this.contactForm.value.subject,
          department: this.contactForm.value.department,
          priority: this.contactForm.value.priority,
          status: 'open',
          message: this.contactForm.value.message,
          dateSubmitted: new Date().toISOString(),
          assignedTo: 'Auto-assigned',
          lastUpdated: new Date().toISOString()
        };

        this.contactInquiries = [newInquiry, ...this.contactInquiries];

        this.messageService.add({
          severity: 'success',
          summary: 'Message Sent',
          detail: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
          life: 5000
        });

        this.contactForm.reset();
        this.contactForm.patchValue({
          department: 'general',
          priority: 'medium'
        });
      }, 2000);
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Form Error',
        detail: 'Please fill in all required fields correctly.',
        life: 4000
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters long.`;
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid phone number.';
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      subject: 'Subject',
      department: 'Department',
      priority: 'Priority',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }

  viewInquiry(inquiry: ContactInquiry): void {
    this.messageService.add({
      severity: 'info',
      summary: 'View Inquiry',
      detail: `Viewing inquiry from ${inquiry.name}`,
      life: 3000
    });
  }

  editInquiry(inquiry: ContactInquiry): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Inquiry',
      detail: `Editing inquiry #${inquiry.id}`,
      life: 3000
    });
  }

  exportInquiries(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Export Started',
      detail: 'Contact inquiries are being exported to CSV.',
      life: 3000
    });
  }

  get totalInquiries(): number {
    return this.contactInquiries.length;
  }

  get openInquiries(): number {
    return this.contactInquiries.filter(i => i.status === 'open').length;
  }

  get inProgressInquiries(): number {
    return this.contactInquiries.filter(i => i.status === 'in-progress').length;
  }

  get closedInquiries(): number {
    return this.contactInquiries.filter(i => i.status === 'closed').length;
  }
}