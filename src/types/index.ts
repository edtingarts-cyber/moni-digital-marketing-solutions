export type PaymentStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';

export interface Order {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  payeeUpiId: string;
  upiTransactionRef: string;
  status: PaymentStatus;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  emailReceiptSent?: boolean;
  notes?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'resource';
  description: string;
  keyTakeaways: string[];
  isFreePreview?: boolean;
  resourceDownloadName?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  payeeUpiId: string;
  modulesCount: number;
  totalDuration: string;
  certificateProvided: boolean;
  category?: string;
  badge?: string;
  features?: string[];
  modules: CourseModule[];
}
