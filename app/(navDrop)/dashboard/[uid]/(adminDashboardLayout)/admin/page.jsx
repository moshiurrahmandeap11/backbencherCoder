"use client"

import AdminHeader from "@/app/components/AdminDashboardComponents/AdminHeader/AdminHeader";
import AdminMainComponents from "@/app/components/AdminDashboardComponents/AdminMainComponents/AdminMainComponents";
import AdminSidebar from "@/app/components/AdminDashboardComponents/AdminSidebar/AdminSidebar";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import useAuth from "@/app/lib/useAuth/useAuth";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const { user } = useAuth();
    const uid = user?.uid;
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("dashboard");

    useEffect(() => {
        // Load active component from localStorage on component mount
        const savedComponent = localStorage.getItem('adminActiveComponent');
        if (savedComponent) {
            setActiveComponent(savedComponent);
        }

        const tryFetching = async () => {
            if (!uid) return;
            
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/users/${uid}`);
                setUserInfo(res.data.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };
        tryFetching();
    }, [uid]);

    const handleComponentChange = (component) => {
        setActiveComponent(component);
        // Save to localStorage
        localStorage.setItem('adminActiveComponent', component);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600">Unable to load user information</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Sidebar */}
            <AdminSidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                userInfo={userInfo}
                activeComponent={activeComponent}
                onComponentChange={handleComponentChange}
            />

            {/* Main Content Area */}
            <div className={`lg:ml-64 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Admin Header */}
                <AdminHeader 
                    toggleSidebar={toggleSidebar} 
                    userInfo={userInfo}
                    activeComponent={activeComponent}
                />

                {/* Main Content */}
                <div className="p-4 md:p-6">
                    <AdminMainComponents activeComponent={activeComponent} />
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;