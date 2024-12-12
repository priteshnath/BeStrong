import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-black text-white px-4 pt-5 pb-10">
      <h2 className="text-4xl font-bold mb-10 text-white  text-center">Contact Us</h2>
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Map Section */}
        <div className="w-full md:w-1/2 h-64 md:h-[400px] rounded-lg overflow-hidden bg-gray-800 mb-10 md:mb-0 md:mr-8">
          <iframe
            title="map"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Be%20Strong%20Gym%20Vastral+(Be%20Strong)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/2 flex flex-col space-y-8">
          <p className="text-lg mb-6 text-center md:text-left">
            Reach out to us for any inquiries, assistance, or feedback. We're here to help!
          </p>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt size={24} className="text-lime-400" />
              <div>
                <h3 className="text-xl font-bold">Our Address</h3>
                <p className="text-gray-300">3rd and 4th Floor,Ved Arcade Mall,Oop Vastral Lake, Sardar Patel Ring Rd, Vastral, Ahmedabad, Gujarat 382418</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <FaPhoneAlt size={24} className="text-lime-400" />
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-gray-300">+91 97252 21515</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <FaEnvelope size={24} className="text-lime-400" />
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-gray-300">contact@bestrong.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
