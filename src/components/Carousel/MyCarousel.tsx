import { Carousel } from "flowbite-react";

const MyCarousel = () => {
  return (
    <div className="relative">
      <Carousel>
        <div className="relative">
          <img
            className="w-full h-auto sm:h-48 md:h-64 lg:h-96 xl:h-128"
            src="/carousel1.png"
            alt="..."
          />
        </div>
        <div className="relative">
          <img
            className="w-full h-auto sm:h-48 md:h-64 lg:h-96 xl:h-128"
            src="/carousel2.png"
            alt="..."
          />
        </div>
        <div className="relative">
          <img
            className="w-full h-auto sm:h-48 md:h-64 lg:h-96 xl:h-128"
            src="/carousel3.png"
            alt="..."
          />
        </div>
        <div className="relative">
          <img
            className="w-full h-auto sm:h-48 md:h-64 lg:h-96 xl:h-128"
            src="/carousel4.png"
            alt="..."
          />
        </div>
        <div className="relative">
          <img
            className="w-full h-auto sm:h-48 md:h-64 lg:h-96 xl:h-128"
            src="/carousel5.png"
            alt="..."
          />
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
