import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import SingleService from "./SingleService";

const Service = () => {
  const {data: allCategories = []} = useQuery({
    queryKey: ['users'],
    queryFn: async () =>{
      const res = await fetch('https://server-mrakib007.vercel.app/services');
      const data = await res.json();
      return data;
    }
  })
  return (
    <div className="px-3">
      <h1 class="max-w-2xl my-20 text-center text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl mx-auto dark:text-white">
        Services That We Provide
      </h1>

      <div className="grid lg:grid-cols-3">

        {
          allCategories.map(category => 
            <SingleService
            key={category.id}
            category={category}>
            </SingleService>)
        }

        {/* <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src="https://images.unsplash.com/photo-1642075211546-7de99d235d21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                Apple AirPods
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                $95.00
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              With plenty of talk and listen time, voice-activated Siri access,
              and an available wireless charging case.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card> */}

        {/* <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src="https://images.unsplash.com/photo-1642075223291-f9ec545889fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                Apple AirPods
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                $95.00
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              With plenty of talk and listen time, voice-activated Siri access,
              and an available wireless charging case.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                Apple AirPods
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                $95.00
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              With plenty of talk and listen time, voice-activated Siri access,
              and an available wireless charging case.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
};

export default Service;
