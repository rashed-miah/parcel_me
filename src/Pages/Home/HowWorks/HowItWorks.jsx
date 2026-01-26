import icon from "../../../assets/bookingIcon.png";

const howItWorks = [
  {
    title: "Place Order",
    desc: "Create a delivery request by providing pickup and drop-off details.",
  },
  {
    title: "Assign Rider",
    desc: "Our system automatically assigns the nearest available rider.",
  },
  {
    title: "Track Parcel",
    desc: "Track your parcel in real-time from pickup to delivery.",
  },
  {
    title: "Delivered",
    desc: "Parcel is delivered safely and confirmation is sent to you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className=" px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          How Our Parcel System Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="p-6 rounded-xl border border-gray-200
              transition-all duration-300 ease-in-out
              hover:bg-[#CAEB66] hover:scale-105 cursor-pointer"
            >
              <img src={icon} alt={item.title} className="w-16 h-16 mb-4" />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
