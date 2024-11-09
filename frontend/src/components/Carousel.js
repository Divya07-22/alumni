// // // src/components/Carousel.js
// // import React from 'react';
// // import { Carousel } from 'react-bootstrap'; // Make sure to install react-bootstrap for Carousel

// // const ImageCarousel = () => {
// //   return (
// //     <Carousel>
// //       <Carousel.Item>
// //         <img
// //           className="d-block w-100"
// //           src="https://via.placeholder.com/800x400?text=First+Image"
// //           alt="First slide"
// //         />
// //         <Carousel.Caption>
// //           <h3>First Slide</h3>
// //           <p>First slide description</p>
// //         </Carousel.Caption>
// //       </Carousel.Item>
// //       <Carousel.Item>
// //         <img
// //           className="d-block w-100"
// //           src="https://via.placeholder.com/800x400?text=Second+Image"
// //           alt="Second slide"
// //         />
// //         <Carousel.Caption>
// //           <h3>Second Slide</h3>
// //           <p>Second slide description</p>
// //         </Carousel.Caption>
// //       </Carousel.Item>
// //       <Carousel.Item>
// //         <img
// //           className="d-block w-100"
// //           src="https://via.placeholder.com/800x400?text=Third+Image"
// //           alt="Third slide"
// //         />
// //         <Carousel.Caption>
// //           <h3>Third Slide</h3>
// //           <p>Third slide description</p>
// //         </Carousel.Caption>
// //       </Carousel.Item>
// //     </Carousel>
// //   );
// // };

// // export default Carousel;
// // src/components/Carousel.js
// // src/components/Carousel.js
// import React from 'react';
// import { Carousel as BootstrapCarousel } from 'react-bootstrap';
// //import 'react-bootstrap/Carousel.css';
// // If you're using Bootstrap CSS
// //import 'bootstrap/dist/css/bootstrap.min.css';

// const Carousel = () => {
//   return (
//     <BootstrapCarousel>
//       <BootstrapCarousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://media.istockphoto.com/id/1066324992/photo/graduation-day.jpg?s=612x612&w=0&k=20&c=cleRpjTZbo430AbH-luZFYMMNqPwhwyTnFgWMbi_AiI="
//           alt="First slide"
//         />

//       </BootstrapCarousel.Item>

//       <BootstrapCarousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://media.istockphoto.com/id/1311388476/vector/diverse-people-set-disabled-girl-afro-american-man-with-cane-muslim-asian-woman.jpg?s=612x612&w=0&k=20&c=uYweVlFjI0GXwa9IRGlat0Boxnn3Lp7xDnufnpPjAgA="
//           alt="Second slide"
//         />
        
//       </BootstrapCarousel.Item>

//       <BootstrapCarousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://media.gettyimages.com/id/1349878808/photo/proud-parents-looking-happy-at-a-graduation-ceremony.jpg?s=612x612&w=gi&k=20&c=MEb9IYGG2EFtkm-bJECwZcBivW3760TA8UGdS2jOwsU="
//           alt="Third slide"
//         />
        
//       </BootstrapCarousel.Item>
//     </BootstrapCarousel>
//   );
// };

// export default Carousel;
// src/components/Carousel.js
import React, { useState } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import '../styles/Carousel.css'; // Import the custom CSS file for styling

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <button className="prev-btn" onClick={() => setIndex(index > 0 ? index - 1 : 2)}>&#10094;</button>
      <BootstrapCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null} // Prevent auto-slide (optional, can be removed if you want auto sliding)
        className="carousel"
      >
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src="https://t4.ftcdn.net/jpg/07/32/41/57/360_F_732415788_dkcOnbApHAzBF4szTtUspkBrbdYs3mOa.jpg"
            alt="First slide"
          />
        </BootstrapCarousel.Item>

        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-vector/party-people-background_1048-7791.jpg"
            alt="Second slide"
          />
        </BootstrapCarousel.Item>

        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-vector/crowd-graduates-mantles-throws-up-square-academic-caps-graduated-student_690577-1184.jpg"
            alt="Third slide"
          />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
      <button className="next-btn" onClick={() => setIndex(index < 2 ? index + 1 : 0)}>&#10095;</button>
    </div>
  );
};

export default Carousel;
