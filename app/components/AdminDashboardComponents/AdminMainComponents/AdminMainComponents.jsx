"use client";

import { Settings } from "lucide-react";
import ContactComponents from "../AdminSidebar/ContactsComponents/ContactComponents";
import ProductsComponents from "../AdminSidebar/ProductsComponents/ProductsComponents";
import ServicesComponents from "../AdminSidebar/ServicesComponents/ServicesComponents";
import UsersComponents from "../AdminSidebar/UsersComponents/UsersComponents";

const AdminMainComponents = ({ activeComponent }) => {

  // Render different components based on activeComponent
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardComponent />;
      case "users":
        return <UsersComponents />
      case "analytics":
        return <AnalyticsComponent />;
      case "products":
        return <ProductsComponents />
      case "services":
        return <ServicesComponents />;
      case "contacts":
        return <ContactComponents />
      case "settings":
        return <SettingsComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return <div>{renderComponent()}</div>;
};

// Individual Components
const DashboardComponent = ({ stats, recentUsers }) => (
  <main className="space-y-6">
    {/* Welcome Banner */}
    <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
          <p className="mt-2 opacity-90">
            Here is what is happening with your platform today.
          </p>
        </div>
      </div>
    </div>
  </main>
);

const AnalyticsComponent = () => <div>rahat</div>;

const SettingsComponent = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600 mt-1">Configure your application settings</p>
    </div>
    <div className="h-96 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
      <div className="text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Settings panel</p>
        <p className="text-sm text-gray-400 mt-1">Configure your preferences</p>
      </div>
    </div>
  </div>
);

export default AdminMainComponents;
