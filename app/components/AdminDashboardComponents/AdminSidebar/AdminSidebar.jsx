"use client"

import {
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Contact,
    Home,
    Layers,
    Settings,
    ShoppingCart,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

const AdminSidebar = ({ 
    sidebarOpen, 
    setSidebarOpen, 
    userInfo,
    activeComponent,
    onComponentChange 
}) => {
    const [activeItem, setActiveItem] = useState("dashboard");

    // Initialize active item from localStorage on component mount
    useEffect(() => {
        const savedComponent = localStorage.getItem('adminActiveComponent');
        if (savedComponent) {
            setActiveItem(savedComponent);
        }
    }, []);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "users", label: "Users", icon: Users },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "products", label: "Products", icon: ShoppingCart },
        { id: "services", label: "Services", icon: Layers },
        { id: "contacts", label: "Contact", icon: Contact},
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        onComponentChange(itemId);
        // Save to localStorage
        localStorage.setItem('adminActiveComponent', itemId);
        
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-lg z-30 transition-all duration-300 ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="p-4 border-b border-gray-200">
                        <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
                            {sidebarOpen && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-linear-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">A</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">Admin</span>
                                </div>
                            )}
                            {!sidebarOpen && (
                                <div className="w-8 h-8 bg-linear-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">A</span>
                                </div>
                            )}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="hidden lg:flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {sidebarOpen ? (
                                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className={`p-4 border-b border-gray-200 ${sidebarOpen ? 'text-left' : 'text-center'}`}>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {userInfo?.name?.charAt(0) || userInfo?.email?.charAt(0) || "A"}
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            {sidebarOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">
                                        {userInfo?.name || userInfo?.email || "Admin User"}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">{userInfo?.role || "Administrator"}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Menu */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleItemClick(item.id)}
                                            className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${activeItem === item.id
                                                    ? "bg-linear-to-r from-purple-50 to-blue-50 text-purple-700 border-l-4 border-purple-600"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                                } ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'}`}
                                        >
                                            <Icon className={`w-5 h-5 ${activeItem === item.id ? 'text-purple-600' : 'text-gray-500'}`} />
                                            {sidebarOpen && (
                                                <span className="font-medium">{item.label}</span>
                                            )}
                                            {activeItem === item.id && sidebarOpen && (
                                                <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full"></div>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Active Component Indicator (for collapsed sidebar) */}
                    {!sidebarOpen && (
                        <div className="p-2 border-t border-gray-200 text-center">
                            <div className="text-xs text-gray-500 font-medium truncate px-1">
                                {menuItems.find(item => item.id === activeItem)?.label || activeComponent}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;