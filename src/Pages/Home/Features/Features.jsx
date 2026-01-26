import feature1 from "../../../assets/safe-delivery.png";
import feature2 from "../../../assets/live-tracking.png";
import feature3 from "../../../assets/safe-delivery.png";
const features = [
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: feature1,
  },
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: feature2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: feature3,
  },
];
const Features = () => {
  return (
    <section className="w-full py-4 md:py-12 lg:py-16 bg-white px-2 md:px-8 lg:px-16">
      <div className="px-4 space-y-4 md:space-y-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center rounded-2xl shadow-sm gap-6 p-6"
          >
            {/* Left: Image */}
            <div className="flex justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="h-20 w-24 sm:h-28 sm:w-28 "
              />
            </div>

            {/* Divider */}
            {/* Vertical Divider */}
            <div className="hidden md:flex items-center">
              <div className="h-32 border-l-2 border-dashed border-gray-400"></div>
            </div>

            {/* Right: Text */}
            <div className="w-full text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-[#03373D]">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed  mx-auto md:mx-0">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
