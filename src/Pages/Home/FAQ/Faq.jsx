import React from "react";

const Faq = () => {
  return (
    <div data-aos="fade-right" className=" my-8 sm:my-10 md:my-14 lg:my-20">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold  text-center">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-center  my-4 md:my-6 ">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="collapse shadow collapse-arrow my-4 bg-base-100  border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day. Here’s how it typically functions: A
          posture corrector works by providing support and gentle alignment to
          your shoulders.
        </div>
      </div>
      <div className="collapse shadow  collapse-arrow my-4 bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm">
          Yes, our posture corrector is designed to comfortably fit and support
          a wide range of ages and body types.
        </div>
      </div>
      <div className="collapse shadow  collapse-arrow  my-4 bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Does it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-sm">
          Absolutely. With consistent use, most users experience improved
          posture and reduced back discomfort over time.
        </div>
      </div>
      <div className="collapse shadow  collapse-arrow my-4 bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-sm">
          Yes, our advanced models include vibration alerts to gently remind you
          when you're slouching.
        </div>
      </div>
      <div className="collapse shadow  collapse-arrow my-4 bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          How will I be notified when the product is back in stock?
        </div>
        <div className="collapse-content text-sm">
          You can sign up for restock notifications via email on our product
          page. We'll alert you as soon as it’s available!
        </div>
      </div>
    </div>
  );
};

export default Faq;
