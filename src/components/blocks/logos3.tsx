"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Dell",
      image: "https://cdn.simpleicons.org/dell/0076D3",
      className: "h-10 md:h-14 w-auto",
    },
    {
      id: "logo-2",
      description: "HP",
      image: "https://cdn.simpleicons.org/hp/0096D6",
      className: "h-10 md:h-14 w-auto",
    },
    {
      id: "logo-3",
      description: "Asus",
      image: "https://cdn.simpleicons.org/asus/00539B",
      className: "h-7 md:h-10 w-auto",
    },
    {
      id: "logo-4",
      description: "Acer",
      image: "https://cdn.simpleicons.org/acer/83B81A",
      className: "h-8 md:h-12 w-auto",
    },
    {
      id: "logo-5",
      description: "MSI",
      image: "https://cdn.simpleicons.org/msi/FF0000",
      className: "h-10 md:h-14 w-auto",
    },
    {
      id: "logo-6",
      description: "Apple",
      image: "https://cdn.simpleicons.org/apple/000000",
      className: "h-10 md:h-14 w-auto",
    },
    {
      id: "logo-7",
      description: "Lenovo",
      image: "https://cdn.simpleicons.org/lenovo/E2231A",
      className: "h-10 md:h-14 w-auto",
    },
    {
      id: "logo-8",
      description: "Nvidia",
      image: "https://cdn.simpleicons.org/nvidia/76B900",
      className: "h-8 md:h-10 w-auto",
    },
    {
      id: "logo-9",
      description: "AMD",
      image: "https://cdn.simpleicons.org/amd/ED1C24",
      className: "h-8 md:h-10 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-24">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-3xl">
          {heading}
        </h2>
      </div>
      <div className="pt-10">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-1 md:mx-10 flex shrink-0 items-center justify-center grayscale-0 opacity-100 hover:grayscale hover:opacity-50 transition-all duration-300">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
