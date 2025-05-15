import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../../store/thunks/orderThunks';
import { updateOrderLocally } from '../../../store/slices/orderSlice';
import OrderTable from '../../../components/order/OrderTable';
import Loader from '../../../components/common/Loader';
import { toast } from 'react-toastify';
import AdminLayout from '../AdminLayout';
import Pagination from '../../../components/common/Pagination'; // Ensure the path is correct

export default function OrderManagement() {
  const dispatch = useDispatch();
  const { allOrders, loading, error } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (orderId, statusUpdate) => {
    try {
      const updatedOrder = await dispatch(updateOrderStatus({ id: orderId, ...statusUpdate })).unwrap();
      dispatch(updateOrderLocally(updatedOrder));
      toast.success('Order status updated successfully');
    } catch (err) {
      toast.error(err?.message || 'Failed to update order status');
    }
  };

  // Slice orders for pagination
  const startIdx = currentPage * itemsPerPage;
  const paginatedOrders = allOrders.slice(startIdx, startIdx + itemsPerPage);

  return (
      <AdminLayout className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Management</h1>
        {loading ? (
            <Loader />
        ) : error ? (
            <p className="text-red-600">{error}</p>
        ) : (
            <>
              <OrderTable orders={paginatedOrders} onStatusUpdate={handleStatusUpdate} />
              <Pagination
                  currentPage={currentPage}
                  totalItems={allOrders.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onRowsPerPageChange={(newLimit) => {
                    setItemsPerPage(newLimit);
                    setCurrentPage(0); // reset to first page on itemsPerPage change
                  }}
              />
            </>
        )}
      </AdminLayout>
  );
}
