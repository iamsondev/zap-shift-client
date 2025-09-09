import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce input (wait 400ms after user stops typing)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["searchUsers", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return { users: [] };
      const res = await axiosSecure.get(`/users/search?email=${debouncedSearch}`);
      return res.data;
    },
    enabled: !!debouncedSearch, // only run if user typed something
  });

  const users = data?.users || [];

  const makeAdminMutation = useMutation({
    mutationFn: (userId) =>
      axiosSecure.put(`/users/${userId}/role`, { role: "admin" }),
  });

  const removeAdminMutation = useMutation({
    mutationFn: (userId) =>
      axiosSecure.put(`/users/${userId}/role`, { role: "user" }),
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Make Admin</h1>

      <input
        type="text"
        placeholder="Type email to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {isLoading && <p>Loading...</p>}

      {users.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Email</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.name || "-"}</td>
                <td className="border p-2">{user.role || "user"}</td>
                <td className="border p-2">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className="bg-green-500 btn text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role === "admin" && (
                    <button
                      onClick={() => removeAdminMutation.mutate(user._id)}
                      className="bg-red-500 btn text-white px-3 py-1 rounded"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && debouncedSearch && users.length === 0 && (
        <p>No users found matching "{debouncedSearch}"</p>
      )}
    </div>
  );
};

export default MakeAdmin;
