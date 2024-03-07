import { Carousel } from 'react-bootstrap';
import img1 from "../assets/img1.jpg"

import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
const DarkCarousel = () => {
  return (<>

    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1} height={650}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3} height={650}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  </>

  );
};

export default DarkCarousel;
