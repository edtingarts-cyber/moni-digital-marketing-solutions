import { Order, PaymentStatus } from '../types/index.ts';

const STORAGE_KEY = 'moni_digital_orders_v2';
const ACTIVE_STUDENT_SESSION_KEY = 'moni_active_student_order_id';

// Basic HTML sanitizer to prevent XSS in stored order strings
function sanitizeString(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Initial sample orders so admin verification can be immediately tested
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'MDM-10041',
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma92@example.com',
    studentPhone: '+91 98765 43210',
    courseId: 'moni-dm-mastery',
    courseTitle: 'Moni Digital Marketing Mastery & Agency Blueprint',
    amount: 5999,
    currency: 'INR',
    payeeUpiId: 'edtingarts-2@oksbi',
    upiTransactionRef: '410293847561',
    status: 'VERIFIED',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
    verifiedAt: new Date(Date.now() - 3600 * 1000 * 24 * 1).toISOString(),
    verifiedBy: 'edtingarts@gmail.com (Admin)',
    emailReceiptSent: true,
    notes: 'Verified via SBI YONO Bank Statement. UTR matched ₹5,999.',
  },
  {
    id: 'MDM-10042',
    studentName: 'Rahul Verma',
    studentEmail: 'rahul.verma.growth@example.com',
    studentPhone: '+91 98112 34567',
    courseId: 'moni-dm-mastery',
    courseTitle: 'Moni Digital Marketing Mastery & Agency Blueprint',
    amount: 5999,
    currency: 'INR',
    payeeUpiId: 'edtingarts-2@oksbi',
    upiTransactionRef: '410882391002',
    status: 'PENDING_VERIFICATION',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    emailReceiptSent: false,
    notes: 'Submitted via PhonePe UPI. Awaiting admin bank reconciliation.',
  },
];

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return INITIAL_DEMO_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
}

export interface CreateOrderInput {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  payeeUpiId: string;
  upiTransactionRef: string;
}

export function createOrder(input: CreateOrderInput): { success: boolean; order?: Order; error?: string } {
  const sanitizedName = sanitizeString(input.studentName);
  const sanitizedEmail = sanitizeString(input.studentEmail).toLowerCase();
  const sanitizedPhone = sanitizeString(input.studentPhone);
  const sanitizedRef = sanitizeString(input.upiTransactionRef).toUpperCase();

  if (!sanitizedName || sanitizedName.length < 2) {
    return { success: false, error: 'Please enter a valid student name.' };
  }
  if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!sanitizedPhone || sanitizedPhone.length < 8) {
    return { success: false, error: 'Please enter a valid contact phone number.' };
  }
  if (!sanitizedRef || sanitizedRef.length < 6) {
    return { success: false, error: 'Please enter a valid UPI Transaction / UTR Reference number (e.g., 12 digits).' };
  }

  const existingOrders = getStoredOrders();

  // Check for duplicate reference ID to prevent replay or fraud
  const duplicate = existingOrders.find(
    o => o.upiTransactionRef.toUpperCase() === sanitizedRef && o.status !== 'REJECTED'
  );
  if (duplicate) {
    return {
      success: false,
      error: `This UPI Reference ID (${sanitizedRef}) was already submitted for Order #${duplicate.id}. Please provide your unique bank transaction reference.`,
    };
  }

  // Generate unique order ID
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderId = `MDM-${randomSuffix}`;

  const newOrder: Order = {
    id: orderId,
    studentName: sanitizedName,
    studentEmail: sanitizedEmail,
    studentPhone: sanitizedPhone,
    courseId: input.courseId,
    courseTitle: input.courseTitle,
    amount: input.amount,
    currency: 'INR',
    payeeUpiId: input.payeeUpiId,
    upiTransactionRef: sanitizedRef,
    // Status is strictly PENDING until manual or bank verification
    status: 'PENDING_VERIFICATION',
    createdAt: new Date().toISOString(),
    emailReceiptSent: false,
  };

  const updated = [newOrder, ...existingOrders];
  saveOrders(updated);

  // Set as current active session order for student tracking
  setActiveStudentOrderId(orderId);

  return { success: true, order: newOrder };
}

export function updateOrderStatus(
  orderId: string,
  newStatus: PaymentStatus,
  verifierInfo: string,
  rejectionReason?: string,
  notes?: string
): { success: boolean; order?: Order; error?: string } {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) {
    return { success: false, error: `Order #${orderId} not found.` };
  }

  const updatedOrder: Order = {
    ...orders[index],
    status: newStatus,
    verifiedAt: new Date().toISOString(),
    verifiedBy: verifierInfo,
    rejectionReason: newStatus === 'REJECTED' ? rejectionReason : undefined,
    notes: notes || orders[index].notes,
  };

  orders[index] = updatedOrder;
  saveOrders(orders);
  return { success: true, order: updatedOrder };
}

export function markEmailReceiptSent(orderId: string): void {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].emailReceiptSent = true;
    saveOrders(orders);
  }
}

export function getActiveStudentOrderId(): string | null {
  return localStorage.getItem(ACTIVE_STUDENT_SESSION_KEY);
}

export function setActiveStudentOrderId(orderId: string): void {
  localStorage.setItem(ACTIVE_STUDENT_SESSION_KEY, orderId);
}

export function clearActiveStudentOrderId(): void {
  localStorage.removeItem(ACTIVE_STUDENT_SESSION_KEY);
}

export function findOrderByLookup(query: string): Order | null {
  if (!query) return null;
  const q = query.trim().toUpperCase();
  const orders = getStoredOrders();
  return (
    orders.find(
      o =>
        o.id.toUpperCase() === q ||
        o.upiTransactionRef.toUpperCase() === q ||
        o.studentEmail.toUpperCase() === q
    ) || null
  );
}

/**
 * Checks whether an order or email has verified access to the course
 */
export function hasVerifiedCourseAccess(orderIdOrEmail: string | null): boolean {
  if (!orderIdOrEmail) return false;
  const target = orderIdOrEmail.trim().toLowerCase();
  const orders = getStoredOrders();
  return orders.some(
    o =>
      (o.id.toLowerCase() === target || o.studentEmail.toLowerCase() === target) &&
      o.status === 'VERIFIED'
  );
}
