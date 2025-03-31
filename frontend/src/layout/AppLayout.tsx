import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AdminAppSidebar from "./AdminAppSidebar";
import UserAppSidebar from "./UserAppSidebar";

interface LayoutContentProps {
    role: string;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ role }) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            <div>
                {role === "admin" ? <AdminAppSidebar /> : <UserAppSidebar />}
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

interface AppLayoutProps {
    role: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ role }) => {
    return (
        <SidebarProvider>
            <LayoutContent role={role} />
        </SidebarProvider>
    );
};

export default AppLayout;
