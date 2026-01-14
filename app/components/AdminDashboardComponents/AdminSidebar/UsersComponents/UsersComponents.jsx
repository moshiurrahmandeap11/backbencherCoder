import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import {
    Calendar,
    Eye,
    Mail,
    Phone,
    RefreshCw,
    Search,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

const UsersComponents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users");
      setUsers(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.phone?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && user.status === "active") ||
      (selectedStatus === "inactive" && user.status === "inactive");

    return matchesSearch && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map((user) => user._id || user.id));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (status === "inactive") {
      return `${baseClasses} bg-red-100 text-red-800`;
    } else if (status === "pending") {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getRoleBadge = (role) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    if (role === "admin") {
      return `${baseClasses} bg-purple-100 text-purple-800`;
    } else if (role === "moderator") {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewInfo = (user) => {
    setSelectedUserInfo(user);
    setShowUserInfo(true);
  };

  const handleCloseInfo = () => {
    setShowUserInfo(false);
    setSelectedUserInfo(null);
  };

  const handleActionsMenu = (userId) => {
    setShowActionsMenu(showActionsMenu === userId ? null : userId);
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
    setShowActionsMenu(null);
    // Add your edit logic here
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log("Delete user:", user);
      setShowActionsMenu(null);
      // Add your delete logic here
    }
  };

  const handleChangeRole = (user, newRole) => {
    console.log(`Change ${user.name}'s role to ${newRole}`);
    setShowActionsMenu(null);
    // Add your role change logic here
  };

  const handleToggleStatus = (user) => {
    console.log(`Toggle ${user.name}'s status`);
    setShowActionsMenu(null);
    // Add your status toggle logic here
  };

  if (loading) {
    return <SimpleLoader />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Info Modal */}
      {showUserInfo && selectedUserInfo && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Information</h2>
                <button
                  onClick={handleCloseInfo}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img 
                      src={`${axiosInstance.defaults.baseURL}${selectedUserInfo?.profileImage}` || selectedUserInfo?.photoURL} 
                      alt={selectedUserInfo?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedUserInfo.name || "No Name"}
                    </h3>
                    <p className="text-gray-600">{selectedUserInfo.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={getRoleBadge(selectedUserInfo.role)}>
                        {selectedUserInfo.role || "user"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-gray-900">{selectedUserInfo.name || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="mt-1 text-gray-900">{selectedUserInfo.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="mt-1 text-gray-900">{selectedUserInfo.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">User ID</label>
                      <p className="mt-1 text-gray-900 font-mono text-sm">
                        {selectedUserInfo._id || selectedUserInfo.id || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Registration Date</label>
                      <p className="mt-1 text-gray-900">
                        {formatDate(selectedUserInfo.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Updated</label>
                      <p className="mt-1 text-gray-900">
                        {formatDate(selectedUserInfo.updatedAt) || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {selectedUserInfo.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="mt-1 text-gray-900">{selectedUserInfo.address}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={handleCloseInfo}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Total {users.length} users • {filteredUsers.length} filtered
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchUsers}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header - Desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => handleSort("name")}
              className="col-span-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("email")}
              className="col-span-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </button>
            <div className="col-span-2 text-sm font-medium text-gray-700">
              Phone
            </div>
            <button
              onClick={() => handleSort("role")}
              className="col-span-1 text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Role{" "}
              {sortConfig.key === "role" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSort("createdAt")}
              className="col-span-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Joined{" "}
              {sortConfig.key === "createdAt" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </button>
            <div className="col-span-2 text-sm font-medium text-gray-700 text-center">
              Actions
            </div>
          </div>
        </div>

        {/* Users List - Desktop */}
        <div className="hidden lg:block">
          {currentUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filter
                </p>
              )}
            </div>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user._id || user.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="col-span-2 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src={`${axiosInstance.defaults.baseURL}${user?.profileImage}` || user?.photoURL} 
                      alt={user?.name} 
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name || "No Name"}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {user._id?.slice(-6) || user.id?.slice(-6) || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 truncate">
                      {user.email || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{user.phone || "N/A"}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <span className={getRoleBadge(user.role)}>
                    {user.role || "user"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center space-x-2">
                  {/* View Info Button */}
                  <button
                    onClick={() => handleViewInfo(user)}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Info</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Users List - Mobile */}
        <div className="lg:hidden">
          {currentUsers.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filter
                </p>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <div key={user._id || user.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          className="w-full h-full object-cover" 
                          src={`${axiosInstance.defaults.baseURL}${user?.profileImage}` || user?.photoURL} 
                          alt={user?.name} 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name || "No Name"}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {user.uid || user.id?.slice(-6) || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewInfo(user)}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {user.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {user.phone || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={getRoleBadge(user.role)}>
                        {user.role || "user"}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination and Selected Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === pageNumber
                        ? "bg-purple-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersComponents;