import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingModal = ({serviceBooking,setServiceBooking}) => {
    const {user} = useContext(AuthContext);
    const { serviceName, description, price, image,name } = serviceBooking;
    const handleBooking = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const phone = form.phone.value;

        const booking = {
          name: name,
          serviceBooking: serviceName,
          image_url: image,
          email,
          price,
          phone,
        }
        fetch('http://localhost:5000/bookings',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(booking)
        }).then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            setServiceBooking(null);
            toast.success("Booking Successful!", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }else{
            toast.error("Error Happened!", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
    }
    return (
    <>
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
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{serviceName}</h3>
          <form
            onSubmit={handleBooking}
            className="gird grid-cols-1 gap-3 mt-8"
          >
            <input
              className="input w-full input-bordered my-2"
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
            />
            <input
              className="input w-full input-bordered my-2"
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
            />
            <input
              className="input w-full input-bordered my-2"
              type="text"
              name="price"
              defaultValue={price}
              disabled
            />
            <input
              className="input w-full input-bordered my-2"
              name="phone"
              type="number"
              placeholder="Phone Number"
              required
            />
            {/* <input
              name="meetingLocation"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered"
              required
            /> */}
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
