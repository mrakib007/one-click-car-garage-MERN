import React from 'react';

const About = () => {
    const about1 = "your go-to destination for all your automotive needs. We are passionate about providing reliable and convenient solutions for car owners. Our goal is to simplify the car ownership experience, whether you're looking for professional services, seeking expert advice on maintenance and repairs, or simply want to stay informed about the latest trends and technologies in the automotive industry. With a user-friendly interface and a comprehensive range of offerings, we've got you covered."
    const img1 = 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'

    const about2 = "With a dedicated team of automotive experts, we strive to provide exceptional service and valuable resources to our users. We believe in delivering transparent and trustworthy information to empower car owners to make informed decisions. At AutoSolutions.com, we are committed to ensuring customer satisfaction and fostering a community of car enthusiasts. Join us on this exciting journey as we share our knowledge, passion, and expertise, guiding you to make the most out of your automotive experience."
    const img2 = 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80';

    const about3 = "At AutoSolutions.com, we understand that maintaining and caring for your vehicle can be a daunting task. That's why we have created a platform that offers a wide range of services, from finding reliable mechanics and repair shops in your area to providing step-by-step tutorials for DIY enthusiasts. With our user-friendly interface and innovative features, you can easily schedule appointments, access valuable resources, and connect with other car owners who share your interests. Whether you're a first-time car owner or a seasoned enthusiast, we are here to support you every step of the way. Explore AutoSolutions.com and experience the convenience and peace of mind that comes with our one-click automotive solutions.";
    const img3 = 'https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    return (
        <div className='my-10'>
            <div className='flex flex-row gap-x-5'>
                <div className='basis-3/5 flex items-center justify-center'>
                    <p className='text-xl font-semibold'>{about1}</p>
                </div>
                <div className='basis-2/5'>
                    <img className='rounded-2xl' src={img1} alt="" srcset="" />
                </div>
            </div>

            <div className='flex flex-row my-10 gap-x-5'>
                <div className='basis-2/5'>
                    <img className='rounded-2xl' src={img2} alt="" srcset="" />
                </div>
                <div className='basis-3/5 flex items-center justify-center'>
                    <p className='text-xl font-semibold'>{about2}</p>
                </div>
            </div>

            <div className='flex flex-row gap-x-5'>
                <div className='basis-3/5 flex items-center justify-center'>
                    <p className='text-xl font-semibold'>{about3}</p>
                </div>
                <div className='basis-2/5'>
                    <img className='rounded-2xl' src={img3} alt="" srcset="" />
                </div>
            </div>
        </div>
    );
};

export default About;