import React from 'react';
import Banner from '../Banner/Banner';
import Service from '../Service/Service';
import WhyUs from '../WhyUs/WhyUs';
import PhotoGallery from '../PhotoGallery/PhotoGallery';

const Home = () => {
    return (
        <div className='my-2'>
            <Banner/>
            <WhyUs/>
            <PhotoGallery/>
            <Service/>
        </div>
    );
};

export default Home;