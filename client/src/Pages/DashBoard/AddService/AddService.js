import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
const AddService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["Service"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/services");
      const data = await res.json();
      return data;
    },
  });

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddService = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const service = {
            name: data.name,
            description: data.description,
            price: data.price,
            image: imgData.data.url,
            id: data.category,
          };

          fetch("http://localhost:5000/addService", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              // authorization: `bearer ${}`
            },
            body: JSON.stringify(service),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold">Add A Service</h2>
      <form onSubmit={handleSubmit(handleAddService)}>
        <div class="mb-6">
          <label
            for="service-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Service Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.messages}</p>
          )}
        </div>

        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          type="text"
          {...register("description", { required: true })}
          rows="4"
          class="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write about the service a little more..."
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.email.messages}</p>
        )}

        <div class="mb-6">
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {errors.price && (
          <p className="text-red-500">{errors.email.messages}</p>
        )}

        <div class="mb-6">
          <label
            for="photo"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add a photo
          </label>
          <input
            type="file"
            id="photo"
            {...register("image", { required: "Image is required" })}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.messages}</p>
          )}
        </div>

        <div className="input-group w-full">
          <select
            {...register("category", {
              required: true,
            })}
            className="select select-bordered"
          >
            {services?.map((service) => (
              <option key={service._id} value={service.id}>
                {service.category}
              </option>
            ))}
          </select>
        </div>
        {/* <button onClick={handleAddService} className="btn btn-primary">Add Service</button> */}
        <input type="submit" className="btn btn-primary" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
