import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ContactUs = () => {
  const axiosPublic=useAxiosPublic();
  const {user}=useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name:user?.displayName,
      email:user?.email,
    },
  });

  const onSubmit = async (data) => {
      const message={
        name:data.name,
        email:data.email,
        message:data.message,
      }
      axiosPublic.post("/message", message)
      .then(res=>{
            if (res.data.insertedId) {
              Swal.fire({
                title: `Hey! ${data.name} Your Messasge Send Successfully!`,
                icon: "success",
                draggable: true,
              });
            }
      })
      .catch(error=>{
        console.error(error);
      })
  };

  return (
    <div id="contact" className="w-full">
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
            Have a question or feedback? We’re here to help. Get in touch with us
            today!
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Message */}
              <textarea
                rows="5"
                placeholder="Your Message"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message should be at least 10 characters",
                  },
                })}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">
                  {errors.message.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  bg-blue-600 
                  text-white 
                  py-3 
                  rounded-lg 
                  hover:bg-blue-700 
                  transition-colors 
                  font-semibold
                  disabled:opacity-60
                "
              >
                {isSubmitting ? "Sending..." : "Send Message"}
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

            {/* Google Map */}
            <div className="w-full h-64 mt-4 rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.345642965433!2d90.39003141450003!3d23.750903494618433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf3b1a1d13ef%3A0x76e1d3e23d1f8b4c!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1697110512345!5m2!1sen!2sus"
                className="w-full h-full border-0"
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
