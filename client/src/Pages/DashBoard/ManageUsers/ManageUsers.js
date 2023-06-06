import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../contexts/AuthProvider";

const ManageUsers = () => {
  const {user} = useContext(AuthContext);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) =>{
    console.log(id,'from makeAdmin function');
    fetch(`http://localhost:5000/users/admin/${id}`,{
      method: 'PUT',
    //   headers: {
    //     authorization: `bearer ${localStorage.getItem('accessToken')}`
    // }
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
        toast.success('Making Admin is Successful...', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          refetch();
      }
    })
  }
  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibold my-10">You can manage users form here <span className="text-primary">{user?.displayName}.</span></h1>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User Name
              </th>
              <th scope="col" class="px-6 py-3">
                User Id
              </th>
              <th scope="col" class="px-6 py-3">
                Email Id
              </th>
              <th scope="col" class="px-6 py-3">
                Admin
              </th>
              <th scope="col" class="px-6 py-3">
                Delete User
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td class="px-6 py-4">{user._id}</td>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4">
                  {user?.role !== 'admin' && <button
                  onClick={()=>handleMakeAdmin(user._id)}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Admin
                  </button>}
                </td>
                <td class="px-6 py-4">
                  <button
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
