"use client"

import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { uid } = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAdminPopup, setShowAdminPopup] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!uid) return;

            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users/${uid}`);
                const userData = response.data.data;
                setUser(userData);

                // Check if user is admin and show popup
                if (userData.role === "admin") {
                    setShowAdminPopup(true);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user details");
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [uid]);

    const handleAdminRedirect = () => {
        setShowAdminPopup(false);
        router.push(`/dashboard/${uid}/admin/`);
    };

    const handleClosePopup = () => {
        setShowAdminPopup(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p>User not found</p>
                </div>
            </div>
        );
    }

    // Check if user is admin
    const isAdmin = user.role === "admin";

    // If user is admin, show only normal dashboard here (admin will redirect via popup)
    // If not admin, show normal user dashboard

    return (
        <>
            {/* Admin Welcome Popup */}
            {showAdminPopup && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-3/12 w-full p-6">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome, Administrator!</h3>
                            <p className="text-gray-600 mb-6">
                                You have administrator privileges. Would you like to access the admin dashboard?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAdminRedirect}
                                    className="flex-1 bg-purple-600 cursor-pointer text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Go to Admin Dashboard
                                </button>
                                <button
                                    onClick={handleClosePopup}
                                    className="flex-1 border cursor-pointer border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Stay Here
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Normal Dashboard (shown for all users) */}
            <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isAdmin ? "Admin Dashboard" : "User Dashboard"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Welcome back, {user.name || user.email}!
                    </p>
                    <div className="mt-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isAdmin ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
                            {isAdmin ? "Administrator" : "User"}
                        </span>
                    </div>
                </header>

                {/* Always show normal dashboard content here */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Stats */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Your Overview</h3>
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Completed Tasks</p>
                                <p className="text-2xl font-bold">42</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Projects</p>
                                <p className="text-2xl font-bold">3</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Account Status</p>
                                <p className="text-2xl font-bold text-green-600">Active</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        <div className="mt-4 space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <span className="font-medium text-blue-700">View Profile</span>
                                <p className="text-sm text-blue-600">Edit your personal information</p>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <span className="font-medium text-blue-700">My Projects</span>
                                <p className="text-sm text-blue-600">View and manage your projects</p>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <span className="font-medium text-blue-700">Settings</span>
                                <p className="text-sm text-blue-600">Account preferences</p>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow p-6 md:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-900">Your Recent Activity</h3>
                        <div className="mt-4 space-y-4">
                            <div className="border-l-4 border-blue-500 pl-4 py-2">
                                <p className="font-medium">Project update submitted</p>
                                <p className="text-sm text-gray-500">Yesterday</p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4 py-2">
                                <p className="font-medium">Task completed</p>
                                <p className="text-sm text-gray-500">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Footer Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        {isAdmin 
                            ? "You have administrative privileges. Click 'Go to Admin Dashboard' to access admin features."
                            : "You have access to user features and personal settings."
                        }
                    </p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;