import React from "react";
import ImageSlider from "./ImageSlider";

export  function SliderDemo() {
  const images = [
    { src: "https://picsum.photos/id/1015/1200/800", alt: "Mountain river", caption: "Alpine river valley" },
    { src: "https://picsum.photos/id/1025/1200/800", alt: "Dog portrait", caption: "Good boy, reporting for duty" },
    { src: "https://picsum.photos/id/1043/1200/800", alt: "Desert road", caption: "Open road, golden hour" },
    { src: "https://picsum.photos/id/1052/1200/800", alt: "Forest path", caption: "Quiet forest trail" },
  ];

  return (
    <div className=" w-full h-full bg-neutral-950 flex items-center justify-center rounded-2xl ">
      <ImageSlider
        images={images}
        
        autoPlay
        autoPlayInterval={3500}
        showThumbnails
        onSlideChange={(i) => console.log("Active slide:", i)}
      />
    </div>
  );
}
