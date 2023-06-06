import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const {user} = useContext(AuthContext);
    console.log(user)

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const {data: bookings = []} = useQuery({
        queryKey: ["bookings",user?.email],
        queryFn: async()=>{
            const res = await fetch(url,{
                // headers: {
                //     authorization: `bearer ${localStorage.getItem("accessToken")}`,
                //   },
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })
    console.log(bookings)
    return (
        <div className='my-10'>
          <h1 className='text-3xl font-semibold my-5'>This is your booking orders <span className='text-primary'>{user?.displayName}.</span></h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order NO
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings && 
              bookings?.map((booking, i) => (
                <tr key={booking._id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i+1}
                  </th>
                  <td class="px-6 py-4">{booking.serviceBooking}</td>
                  <td class="px-6 py-4">{booking.price} Tk</td>
                  <td class="px-6 py-4">
                   {
                    booking.price && !booking.paid && (
                        <Link to={`/dashboard/payment/${booking._id}`}>
                            <button className='btn btn-primary btn-sm'>Pay</button>
                        </Link>
                    )
                   }
                   {
                    booking.price && booking.paid && (
                        <span className='text-primary'>Paid</span>
                    )
                   }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyBookings;