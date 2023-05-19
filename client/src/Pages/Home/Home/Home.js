import React from 'react';
import Banner from '../Banner/Banner';
import Service from '../Service/Service';
import WhyUs from '../WhyUs/WhyUs';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import Testimonial from '../Testimonia/Testimonial';

const Home = () => {
    return (
        <div className='my-2'>
            <Banner/>
            <WhyUs/>
            <Service/>
            <PhotoGallery/>
            <Testimonial/>
        </div>
    );
};

export default Home;