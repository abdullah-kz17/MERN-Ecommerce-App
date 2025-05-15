import React from 'react';

const OrderItems = ({ items }) => {
    return (
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700 transition-all">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="py-3 flex justify-between items-center text-sm"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={item.product?.images?.[0]}
                            alt={item.product?.name}
                            loading="lazy"
                            className="w-14 h-14 object-cover rounded-lg border dark:border-gray-700"
                        />
                        <div>
                            <p className="font-medium">{item.product?.name}</p>
                            <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-semibold text-right">
                        Rs.{(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default OrderItems;
