import React from "react";
import { Users, Star, Truck, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607083206968-13611e3f9c3c?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            About <span className="text-blue-400">E-Store</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Your trusted online destination for quality products, great prices,
            and reliable delivery across Bangladesh.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed">
          At <b>E-Store</b>, we believe shopping should be simple, smart, and
          satisfying. From electronics to fashion — we provide a seamless
          online experience where you can find everything in one trusted place.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="flex flex-col md:flex-row items-center justify-center py-16 px-6 md:px-16 bg-gray-400 gap-10 rounded-2xl">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80"
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            We aim to make your life easier by delivering authentic, affordable
            products right to your doorsteps. We’re not just an online store —
            we’re your everyday shopping partner.
          </p>
          <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-600">
            To become Bangladesh’s most trusted and customer-friendly e-commerce
            platform with fast delivery and top-notch service.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="font-semibold mb-2">Customer Focused</h4>
            <p className="text-gray-400 text-sm">
              Your satisfaction is our top priority — always.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-10 h-10 text-yellow-500 mb-3" />
            <h4 className="font-semibold mb-2">Top Quality</h4>
            <p className="text-gray-400 text-sm">
              We only sell 100% authentic and reliable products.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-10 h-10 text-green-600 mb-3" />
            <h4 className="font-semibold mb-2">Nationwide Delivery</h4>
            <p className="text-gray-400 text-sm">
              Fast delivery to every corner of Bangladesh.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-semibold mb-2">Secure Payment</h4>
            <p className="text-gray-400 text-sm">
              Pay securely online or with Cash on Delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <p className="max-w-2xl mx-auto text-gray-400 mb-8">
          Our passionate team works hard every day to deliver the best shopping
          experience for you.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-500 p-6 rounded-xl shadow-lg w-60 hover:shadow-2xl transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=400&q=80"
              alt="Team Member"
              className="rounded-full w-24 h-24 mx-auto object-cover mb-4"
            />
            <h4 className="font-semibold">Masud Rana</h4>
            <p className="text-sm text-white">Founder & Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
