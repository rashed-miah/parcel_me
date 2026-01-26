import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import customer from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";
const reviews = [
  {
    id: "5f47ac10b4f1c03e8c123456",
    user_email: "john.doe@example.com",
    userName: "John Doe",
    delivery_email: "delivery1@example.com",
    ratings: 4.5,
    review: "Smooth delivery and polite staff.",
    parcel_id: "5f47ac10b4f1c03e8c654321",
    pick_up_email: "pickup1@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2024-05-08T14:30:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c234567",
    user_email: "jane.smith@example.com",
    userName: "Jane Smith",
    delivery_email: "delivery2@example.com",
    ratings: 3.8,
    review: "Took a bit longer than expected, but okay overall.",
    parcel_id: "5f47ac10b4f1c03e8c765432",
    pick_up_email: "pickup2@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
    date: "2024-06-10T10:15:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c345678",
    user_email: "alex.brown@example.com",
    userName: "Alex Brown",
    delivery_email: "delivery3@example.com",
    ratings: 5.0,
    review: "Excellent service! Fast and secure.",
    parcel_id: "5f47ac10b4f1c03e8c876543",
    pick_up_email: "pickup3@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
    date: "2024-07-01T08:50:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c456789",
    user_email: "lisa.white@example.com",
    userName: "Lisa White",
    delivery_email: "delivery4@example.com",
    ratings: 4.2,
    review: "Very responsive and professional.",
    parcel_id: "5f47ac10b4f1c03e8c987654",
    pick_up_email: "pickup4@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
    date: "2024-07-15T09:10:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c567890",
    user_email: "david.lee@example.com",
    userName: "David Lee",
    delivery_email: "delivery5@example.com",
    ratings: 2.9,
    review: "Late delivery and no updates. Disappointed.",
    parcel_id: "5f47ac10b4f1c03e8c098765",
    pick_up_email: "pickup5@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
    date: "2024-08-02T16:45:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c678901",
    user_email: "nina.khan@example.com",
    userName: "Nina Khan",
    delivery_email: "delivery6@example.com",
    ratings: 4.9,
    review: "Superb experience! Highly recommended.",
    parcel_id: "5f47ac10b4f1c03e8c109876",
    pick_up_email: "pickup6@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "2024-08-10T12:00:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c789012",
    user_email: "michael.jordan@example.com",
    userName: "Michael Jordan",
    delivery_email: "delivery7@example.com",
    ratings: 3.3,
    review: "Decent service but packaging could be better.",
    parcel_id: "5f47ac10b4f1c03e8c210987",
    pick_up_email: "pickup7@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "2024-08-14T18:20:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c890123",
    user_email: "emma.watson@example.com",
    userName: "Emma Watson",
    delivery_email: "delivery8@example.com",
    ratings: 4.7,
    review: "Fast, safe, and friendly delivery service.",
    parcel_id: "5f47ac10b4f1c03e8c321098",
    pick_up_email: "pickup8@example.com",
    user_photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2024-08-20T07:30:00.000Z",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gray-50">
      <div className=" px-4 text-center">
        {/* Top Image */}
        <img
          src={customer}
          alt="Reviews Illustration"
          className="mx-auto mb-6 h-24"
        />
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-3">
          What our customers are saying
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-14">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides
          loop
          pagination={{ clickable: true, el: ".review-pagination" }}
          navigation={{
            prevEl: ".review-prev",
            nextEl: ".review-next",
          }}
          breakpoints={{
            768: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              {({ isActive }) => (
                <ReviewCard review={review} active={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Arrows */}

        <div className="grid grid-cols-[64px_auto_64px] items-center justify-center gap-4 mt-10 mx-auto w-fit">
          {/* Left Arrow */}
          <button
            className="review-prev w-12 h-12 rounded-full bg-lime-400 shadow
               flex items-center justify-center text-gray-600
               hover:bg-lime-500 transition"
          >
            ←
          </button>

          {/* Pagination Dots (perfect center) */}
          <div
            className="review-pagination flex items-center justify-center gap-2
               [&_.swiper-pagination-bullet]:w-1.5
               [&_.swiper-pagination-bullet]:h-1.5
               [&_.swiper-pagination-bullet]:bg-gray-400
               [&_.swiper-pagination-bullet]:opacity-100
               [&_.swiper-pagination-bullet-active]:bg-[#03373D]"
          />

          {/* Right Arrow */}
          <button
            className="review-next w-12 h-12 rounded-full bg-lime-400 shadow
               flex items-center justify-center text-black
               hover:bg-lime-500 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
