import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Production e API call or email service add kora hobe
    console.log(formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div id="contact" className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-[40vh] flex items-center justify-center text-gray-400"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521790361523-4c30b0c1b2a7?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Have a question or feedback? We’re here to help. Get in touch with
            us today!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 justify-center">
            <h2 className="text-2xl font-bold mb-4">Our Contact Info</h2>
            <div className="flex items-start gap-4">
              <span className="font-semibold">📍</span>
              <p>123 E-Store Street, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-semibold">📧</span>
              <p>support@estore.com</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-semibold">📞</span>
              <p>+880 1234 567890</p>
            </div>
            {/* Optional Google Map */}
            <div className="w-full h-64 mt-4 rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.345642965433!2d90.39003141450003!3d23.750903494618433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf3b1a1d13ef%3A0x76e1d3e23d1f8b4c!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1697110512345!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
