import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useUI } from '../../context/UIContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from '../../sections/Footer';
import { AuthModal } from '../modals/AuthModal';
import { ReviewModal } from '../modals/ReviewModal';
import { FloatingActionButton } from '../ui/FloatingActionButton';
import { Icons } from '../common/icons';

export const MainLayout: React.FC = () => {
    const { user, loading } = useAuth();
    const { isAuthModalOpen, isReviewModalOpen, closeReviewModal, reviewCasinoId } = useUI();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 z-[999]">
                <Icons.Loader className="h-12 w-12 text-[#00FFC0] animate-spin" />
                <p className="font-mono text-[#00FFC0] uppercase tracking-widest animate-pulse">
                    SYNCING WITH THE GRID...
                </p>
            </div>
        );
    }
    
    // Determine if footer should be hidden for immersive pages
    const hideFooterFor = ['/dashboard', '/messages', '/strategy-sandbox', '/strategy-sandbox/mines', '/strategy-sandbox/plinko'];
    const hideFooter = user && hideFooterFor.includes(location.pathname);
    
    const isModalOpen = isAuthModalOpen || isReviewModalOpen || isMobileNavOpen;

    return (
        <div className={`relative min-h-screen w-full max-w-[100vw] bg-[#0A0A0A] text-[#FAFBFF] overflow-x-hidden ${isModalOpen ? 'modal-open' : ''}`}>
            
            <AuthModal />

            <Header 
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
            />

            {user ? (
                // === AUTHENTICATED APP LAYOUT ===
                <>
                    <div className="flex min-h-screen pt-16">
                        <Sidebar 
                            isCollapsed={isSidebarCollapsed} 
                            setIsCollapsed={setIsSidebarCollapsed}
                            isMobileOpen={isMobileNavOpen}
                            setIsMobileOpen={setIsMobileNavOpen}
                        />
                        
                        <div className={`flex flex-1 flex-col min-w-0 w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-64'}`}>
                             <main key={location.pathname} className="flex-1 w-full bg-[#0A0A0A] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 animate-depth-in">
                                <Outlet />
                            </main>
                            {!hideFooter && <Footer />}
                        </div>
                    </div>

                    <MobileBottomNav onToggleMenu={() => setIsMobileNavOpen(!isMobileNavOpen)} />
                    <FloatingActionButton />
                    <ReviewModal
                        isOpen={isReviewModalOpen}
                        onClose={closeReviewModal}
                        initialCasinoId={reviewCasinoId}
                    />
                </>
            ) : (
                 // === PUBLIC LANDING LAYOUT ===
                <div className="flex flex-col min-h-screen pt-16">
                    <main className="flex-1 w-full animate-depth-in">
                        <Outlet />
                    </main>
                    {!hideFooter && <Footer />}
                </div>
            )}
        </div>
    );
};
