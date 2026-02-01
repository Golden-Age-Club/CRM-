import React, { useMemo, useState } from "react";
import ActionsMenu from "../components/ActionsMenu";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  const [users, setUsers] = useState([
    { id: "JD", name: "John Doe", userId: "USR-001", email: "john.doe@example.com", role: "Admin", status: "Active", lastLogin: "Oct 22, 2025" },
    { id: "JS", name: "Jane Smith", userId: "USR-002", email: "jane.smith@example.com", role: "Manager", status: "Active", lastLogin: "Oct 22, 2025" },
    { id: "BJ", name: "Bob Johnson", userId: "USR-003", email: "bob.johnson@example.com", role: "Developer", status: "Active", lastLogin: "Oct 21, 2025" },
    { id: "AW", name: "Alice Williams", userId: "USR-004", email: "alice.williams@example.com", role: "User", status: "Inactive", lastLogin: "Oct 15, 2025" },
  ]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          !searchTerm ||
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const pending = users.filter((u) => u.status === "Pending").length;
    const admins = users.filter((u) => u.role === "Admin").length;

    return [
      { label: "Total Users", value: total, color: "bg-blue-50 text-blue-600", icon: "👥" },
      { label: "Active", value: active, color: "bg-green-50 text-green-600", icon: "✅" },
      { label: "Pending", value: pending, color: "bg-yellow-50 text-yellow-600", icon: "⏳" },
      { label: "Admins", value: admins, color: "bg-purple-50 text-purple-600", icon: "👑" },
    ];
  }, [users]);

  const toggleSelectAll = (checked) => {
    setSelectedUsers(checked ? filteredUsers.map((u) => u.userId) : []);
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      Admin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Manager: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Developer: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      User: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role]}`}>{role}</span>;
  };

  const getStatusBadge = (status) =>
    status === "Active" ? (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        Inactive
      </span>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your team members and their account permissions
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-visible">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => toggleSelectUser(user.userId)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {user.id}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.lastLogin}</td>
                  <td className="px-6 py-4 relative">
                    <ActionsMenu
                      isOpen={openMenu === user.userId}
                      onToggle={() => setOpenMenu(openMenu === user.userId ? null : user.userId)}
                      actions={[
                        { label: "View Details", icon: "view", onClick: () => console.log("View", user.userId) },
                        { label: "Edit User", icon: "edit", onClick: () => console.log("Edit", user.userId) },
                        { label: "Send Email", icon: "email", onClick: () => console.log("Email", user.userId) },
                        { label: "Delete", icon: "delete", onClick: () => console.log("Delete", user.userId), danger: true },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
