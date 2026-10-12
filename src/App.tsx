import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { CourseHero } from './components/CourseHero.tsx';
import { ProductCatalogSection } from './components/ProductCatalogSection.tsx';
import { CurriculumSection } from './components/CurriculumSection.tsx';
import { UpiPaymentGuideSection } from './components/UpiPaymentGuideSection.tsx';
import { Footer } from './components/Footer.tsx';
import { UpiCheckoutModal } from './components/UpiCheckoutModal.tsx';
import { OrderTrackerModal } from './components/OrderTrackerModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { StudentPortal } from './components/StudentPortal.tsx';
import { SecurityCenterModal } from './components/SecurityCenterModal.tsx';
import { getStoredOrders, getActiveStudentOrderId, hasVerifiedCourseAccess } from './services/orderStorage.ts';
import { MONI_COURSE } from './data/courseData.ts';
import { Course, Order } from './types/index.ts';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isSecurityCenterOpen, setIsSecurityCenterOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Course>(MONI_COURSE);
  const [activeStudentKey, setActiveStudentKey] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasVerifiedAccess, setHasVerifiedAccess] = useState(false);

  // Sync state on load and order change
  const refreshOrderState = () => {
    const list = getStoredOrders();
    setOrders(list);
    const activeId = getActiveStudentOrderId();
    setActiveStudentKey(activeId);
    setHasVerifiedAccess(hasVerifiedCourseAccess(activeId));
  };

  useEffect(() => {
    refreshOrderState();
  }, []);

  const handleOrderCreated = (order: Order) => {
    refreshOrderState();
    setActiveStudentKey(order.id);
  };

  const handleOpenVerifiedPortal = (verifiedId: string) => {
    setActiveStudentKey(verifiedId);
    setHasVerifiedAccess(hasVerifiedCourseAccess(verifiedId));
    setIsStudentPortalOpen(true);
  };

  const handleOpenCheckoutWithProduct = (product: Course) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenSecurityCenter={() => setIsSecurityCenterOpen(true)}
        activeOrderCount={orders.length}
        hasVerifiedAccess={hasVerifiedAccess}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <CourseHero
          onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        />

        {/* 3 New Products + Bundle Section */}
        <ProductCatalogSection
          onSelectProductToCheckout={handleOpenCheckoutWithProduct}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        />

        {/* 8-Module Mastery Curriculum */}
        <CurriculumSection
          onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
          onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
          hasVerifiedAccess={hasVerifiedAccess}
        />

        {/* UPI Payment Instructions */}
        <UpiPaymentGuideSection
          onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSecurityCenter={() => setIsSecurityCenterOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      {/* UPI Checkout Modal */}
      <UpiCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCreated={handleOrderCreated}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        initialProduct={selectedProduct}
      />

      {/* Track Order / UTR Modal */}
      <OrderTrackerModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        onOpenStudentPortal={handleOpenVerifiedPortal}
        onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
      />

      {/* Admin Bank Verification Portal Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOrdersChanged={refreshOrderState}
      />

      {/* Student Learning Portal */}
      <StudentPortal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        onOpenCheckout={() => handleOpenCheckoutWithProduct(MONI_COURSE)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        verifiedEmailOrId={activeStudentKey}
      />

      {/* Security Center Audit Modal */}
      <SecurityCenterModal
        isOpen={isSecurityCenterOpen}
        onClose={() => setIsSecurityCenterOpen(false)}
      />
    </div>
  );
}
