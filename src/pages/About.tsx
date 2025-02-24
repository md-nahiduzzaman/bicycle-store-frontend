import { Bike, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <div className="container p-4 mx-auto ">
      <section className="py-32">
        <div className="container flex flex-col gap-28">
          <div className="flex flex-col gap-7">
            <h1 className="text-4xl font-semibold text-center lg:text-7xl">
              Ride with Passion, <br /> Explore with Spinzo
            </h1>
            <p className="max-w-xl mx-auto text-lg text-center">
              At Spinzo, we are committed to bringing the best cycling
              experience to riders of all levels. Whether you're a beginner or a
              seasoned pro, we have the perfect bike for you.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bicycle Shop"
              className="object-cover size-full max-h-96 rounded-2xl"
            />
            <div
              className="relative flex flex-col justify-between gap-10 p-10 overflow-hidden rounded-2xl bg-muted"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/1208777/pexels-photo-1208777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <p className="relative text-3xl text-white">OUR MISSION</p>
              <p className="relative text-lg font-medium text-white">
                We aim to inspire a love for cycling by offering high-quality
                bikes, exceptional service, and a passionate community. Your
                journey starts here.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-20">
            <div className="max-w-xl">
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                Why Choose Spinzo?
              </h2>
              <p className="text-muted-foreground">
                We believe cycling is more than just a ride—it's a way of life.
                Here’s how we make every journey special.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col border border-gray-300 rounded-2xl p-7">
                <div className="flex items-center justify-center mb-5 size-12 rounded-2xl bg-accent">
                  <Bike className="size-5" />
                </div>
                <h3 className="mt-2 mb-3 text-lg font-semibold">
                  Top-Quality Bicycles
                </h3>
                <p className="text-muted-foreground">
                  We offer a wide range of premium bicycles, from road bikes to
                  mountain bikes, ensuring you get the best ride for your
                  adventures.
                </p>
              </div>
              <div className="flex flex-col border border-gray-300 rounded-2xl p-7">
                <div className="flex items-center justify-center mb-5 size-12 rounded-2xl bg-accent">
                  <Heart className="size-5" />
                </div>
                <h3 className="mt-2 mb-3 text-lg font-semibold">
                  Passionate Community
                </h3>
                <p className="text-muted-foreground">
                  Join a community of cycling enthusiasts who share the same
                  passion for adventure and a healthy lifestyle.
                </p>
              </div>
              <div className="flex flex-col border border-gray-300 rounded-2xl p-7">
                <div className="flex items-center justify-center mb-5 size-12 rounded-2xl bg-accent">
                  <Target className="size-5" />
                </div>
                <h3 className="mt-2 mb-3 text-lg font-semibold">
                  Expert Guidance
                </h3>
                <p className="text-muted-foreground">
                  Our experts are here to help you choose the perfect bike,
                  offer maintenance tips, and ensure a smooth cycling
                  experience.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-10 text-sm font-medium text-muted-foreground">
                JOIN OUR JOURNEY
              </p>
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                Experience the Ride of a Lifetime
              </h2>
              <p className="max-w-xl mt-4 text-lg">
                Whether you’re cycling for fun, fitness, or adventure, Spinzo is
                here to support your journey. Explore, ride, and make memories
                with us!
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1549306/pexels-photo-1549306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Cycling Adventure"
                className="object-cover size-full max-h-96 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
