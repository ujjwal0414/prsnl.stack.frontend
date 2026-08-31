import React from "react";
import ImageSlider from "./ImageSlider";

export  function SliderDemo() {
  const images = [
    { src: "https://images.unsplash.com/photo-1503401639559-b16332601594?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdW50YWluJTIwcml2ZXJ8ZW58MHx8MHx8fDA%3D", alt: "Mountain river", caption: "Alpine river valley" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX7wdWdz0Lxse2twUP_mvYLnGi4qCYn293Had-aa5wlnOQJV6dgiUdK5A&s=10", alt: "Dog portrait", caption: "Good boy, reporting for duty" },
    { src: "https://img.magnific.com/free-photo/road-way-spitzkoppe-mountains-spitzkoppe-is-group-bald-granite-peaks-located-swakopmund-namib-desert-namibia_1150-21644.jpg?semt=ais_hybrid&w=740&q=80", alt: "Desert road", caption: "Open road, golden hour" },
    { src: "https://images.unsplash.com/photo-1507139722691-cc2c94e3a2b2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZXN0JTIwcGF0aHxlbnwwfHwwfHx8MA%3D%3D", alt: "Forest path", caption: "Quiet forest trail" },
  ];

  return (
    <div className=" w-full h-full bg-neutral-950 flex items-center justify-center rounded-2xl ">
      <ImageSlider
        images={images}
        
        autoPlay
        autoPlayInterval={3500}
        showThumbnails
        // onSlideChange={(i) => console.log("Active slide:", i)}
      />
    </div>
  );
}
