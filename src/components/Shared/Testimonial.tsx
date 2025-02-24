"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "testimonial-1",
    text: "The bicycle I bought is fantastic! It rides smoothly, and the design is top-notch. Highly recommend this store for any bike enthusiast.",
    name: "John Doe",
    role: "Cycling Enthusiast",
  },
  {
    id: "testimonial-2",
    text: "Amazing customer service and a wide selection of bikes. I was able to find the perfect bike for my daily commute!",
    name: "Jane Smith",
    role: "Urban Cyclist",
  },
  {
    id: "testimonial-3",
    text: "I’ve been cycling for years, and the quality of the bike I purchased here exceeds all my expectations. Great experience all around!",
    name: "Mark Wilson",
    role: "Professional Cyclist",
  },
];

const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className="container py-16 mx-auto">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="container flex flex-col items-center text-center">
                <p className="max-w-4xl mb-8 font-medium md:px-8 lg:text-3xl">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="mb-1 text-lg font-medium">{testimonial.name}</p>
                <p className="mb-2 text-sm text-muted-foreground md:text-lg">
                  {testimonial.role}
                </p>
                <div className="mt-2 flex items-center gap-0.5">
                  <Star className="size-5 fill-primary stroke-none" />
                  <Star className="size-5 fill-primary stroke-none" />
                  <Star className="size-5 fill-primary stroke-none" />
                  <Star className="size-5 fill-primary stroke-none" />
                  <Star className="size-5 fill-primary stroke-none" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container flex justify-center py-16">
        {testimonials.map((testimonial, index) => (
          <Button
            key={testimonial.id}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
          >
            <div
              className={`size-2.5 rounded-full ${
                index === current ? "bg-primary" : "bg-input"
              }`}
            />
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
