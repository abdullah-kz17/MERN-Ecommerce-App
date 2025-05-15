import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../../../store/thunks/userThunks';
import UsersTable from '../../../components/user/UsersTable';
import AdminLayout from '../AdminLayout';
import Loader from '../../../components/common/Loader';
import Pagination from '../../../components/common/Pagination';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const loadUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setActionLoading(true);
      await dispatch(deleteUser(id)).unwrap();
      toast.success('User deleted successfully');
      await loadUsers();
    } catch (err) {
      toast.error(err || 'Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleAdmin = async (id, isAdmin) => {
    try {
      setActionLoading(true);
      await dispatch(updateUser({ id, updates: { isAdmin } })).unwrap();
      toast.success('User role updated');
      await loadUsers();
    } catch (err) {
      toast.error(err || 'Failed to update user');
    } finally {
      setActionLoading(false);
    }
  };

  // Slice users for current page
  const startIdx = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(startIdx, startIdx + itemsPerPage);

  return (
      <AdminLayout className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        </div>

        {loading ? (
            <Loader />
        ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
        ) : (
            <>
              <UsersTable
                  users={paginatedUsers}
                  onDelete={handleDelete}
                  onToggleAdmin={handleToggleAdmin}
                  actionLoading={actionLoading}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
              />

              <Pagination
                  currentPage={currentPage}
                  totalItems={users.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onRowsPerPageChange={(limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(0);
                  }}
              />
            </>
        )}
      </AdminLayout>
  );
}
