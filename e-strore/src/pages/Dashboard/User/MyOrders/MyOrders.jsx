import React from 'react'
import useMyOrders from '../../../../hooks/useMyOrders'
import { Link } from 'react-router';

const MyOrders = () => {
  const [myOrders, refetch]=useMyOrders();
  return (
    <div className="overflow-x-auto">
      <div class="divider divider-success">My Orders</div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>paymentInfo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            myOrders.map((item, index)=><tr key={item._id}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={item.items[0].image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.items[0].name}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="font-bold">{item.paymentInfo.transactionId}</div>
            </td>
            <th>
              <Link item={item} className="btn btn-ghost btn-xs">details</Link>
            </th>
          </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders;
