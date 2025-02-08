import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { certificates } from "../constants";
import { useAutoplay } from "./CarousalAutoPlay.jsx";

export function CertificateCarousal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 3000 }),
  ]);
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {certificates.map((certificate, index) => (
            <div className="embla__slide" key={certificate.name}>
              <img className="shadow-lg" src={certificate.imageUrl} alt={certificate.name}/>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-12 gap-12">
        <div className="h-10 w-10 lg:h-12 lg:w-12">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Farrow.png?alt=media&token=d1cb8d51-ee0d-4d06-866e-21805d94f65c"
            alt="Prev"
            onClick={scrollPrev}
            className="embla__prev bg-red-200 rounded-full cursor-pointer 
                   bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500  text-white"
          />
        </div>
        <div
          className="embla__play h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500  text-white cursor-pointer"
          onClick={toggleAutoplay}
          type="button "
        >
          {autoplayIsPlaying ? (
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fpause.png?alt=media&token=34c69b71-f74b-44df-b352-ec39968c8d1c"
                alt="Stop"
                width="100%"
                height="100%"
                className="p-2 cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fplay.png?alt=media&token=a1fb6c32-e288-4336-ab8b-b425e76bd390"
                alt="Start"
                width="100%"
                height="100%"
                className="p-2 cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="h-10 w-10 lg:h-12 lg:w-12">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Farrow.png?alt=media&token=d1cb8d51-ee0d-4d06-866e-21805d94f65c"
            alt="Next"
            onClick={scrollNext}
            className="embla__next rotate-180 rounded-full cursor-pointer 
                   bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500  text-white"
          />
        </div>
      </div>
    </div>
  );
}
