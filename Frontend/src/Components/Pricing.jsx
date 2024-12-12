import { Link as ScrollLink } from "react-scroll";

const Pricing = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">
          The Best Plan For Your Needs
        </h2>
        <div className="flex justify-center space-x-10">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Basic Membership</h3>
            <p className="text-4xl font-bold mt-4">
              ₹1000 <span className="text-lg">/ month</span>
            </p>
            <ul className="mt-4">
              <li>Access to all gym facilities</li>
              <li>Unlimited use of equipment</li>
              <li>Discounted rates on group classes</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold">Premium Membership</h3>
            <p className="text-4xl font-bold mt-4">
              ₹2000 <span className="text-lg">/ month</span>
            </p>
            <ul className="mt-4">
              <li>All the benefits of Basic</li>
              <li>Unlimited group classes</li>
              <li>Priority booking for personal training</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold px-7">VIP Membership</h3>
            <p className="text-4xl font-bold mt-4">
              ₹4000 <span className="text-lg">/ month</span>
            </p>
            <ul className="mt-4">
              <li>All the benefits of Premium</li>
              <li>Exclusive member events</li>
              <li>VIP lounge access</li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
        <ScrollLink
          to="contactus"
          smooth={true}
          offset={-70}
          duration={500}
          className="bg-lime-400 text-black cursor-pointer font-semibold py-2 px-6 rounded-md w-80"
        >
          Contact Us
        </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
