import { useState, useEffect } from "react";
const slides = [
    {
      CustomerName: "Amara Perera",
      Feedback:
        "The service was exceptional and the team was very attentive to my needs. Highly recommend to anyone looking for quality products!",
    },
    {
      CustomerName: "Nimal Fernando",
      Feedback:
        "I am very pleased with my purchase. The quality exceeded my expectations and delivery was quick. Will definitely buy again!",
    },
    {
      CustomerName: "Kamalini Silva",
      Feedback:
        "Wonderful experience! The product arrived just as described and the customer service was friendly and helpful.",
    },
    {
      CustomerName: "Ruwan Wijesinghe",
      Feedback:
        "Superb quality and fantastic support. They helped me find exactly what I was looking for. Definitely a repeat customer!",
    },
    {
      CustomerName: "Samanthi Jayawardena",
      Feedback:
        "I’ve purchased several items, and each one has been perfect. Fast delivery and excellent packaging. Highly recommended!",
    },
    {
      CustomerName: "Chathura Rathnayake",
      Feedback:
        "Great quality and reliable service. The product arrived on time and in perfect condition. Couldn’t be happier!",
    },
    {
      CustomerName: "Dinusha Abeykoon",
      Feedback:
        "Amazing experience from start to finish! The team was very responsive, and the product quality was top-notch.",
    },
    {
      CustomerName: "Sunethra Perera",
      Feedback:
        "I was impressed by the attention to detail. The product is exactly what I was looking for and at a fair price. Thank you!",
    },
    {
      CustomerName: "Gayan Wickramasinghe",
      Feedback:
        "Fantastic product and wonderful customer support. They went out of their way to ensure I was satisfied. Highly recommend!",
    },
    {
      CustomerName: "Pasan De Silva",
      Feedback:
        "The product quality is unmatched and the delivery was incredibly fast. I am very impressed with the service.",
    },
    {
      CustomerName: "Rashmi Fernando",
      Feedback:
        "Exceptional customer service and the product quality is exactly as promised. I will definitely come back for more!",
    },
    {
      CustomerName: "Lasantha Weerasinghe",
      Feedback:
        "The team was very accommodating and ensured I got exactly what I needed. Great experience all around!",
    },
    {
      CustomerName: "Sanduni Perera",
      Feedback:
        "Very happy with my purchase. The product is of great quality and the service was prompt and professional.",
    },
    {
      CustomerName: "Kasun Karunaratne",
      Feedback:
        "I had a smooth and pleasant experience. The product exceeded my expectations and arrived sooner than expected.",
    },
    {
      CustomerName: "Shalika Jayasuriya",
      Feedback:
        "High-quality product and excellent service! The staff was friendly and made the whole process very easy.",
    },
    {
      CustomerName: "Lakmal Abeysekera",
      Feedback:
        "I’ve recommended this place to several friends already. The product is amazing and the customer service is very attentive.",
    },
    {
      CustomerName: "Roshani Dissanayake",
      Feedback:
        "Beautiful product and exceptional quality. The whole experience was seamless. Will be coming back for more!",
    },
    {
      CustomerName: "Tharindu Ranasinghe",
      Feedback:
        "The attention to detail is outstanding. I received exactly what I wanted and am very satisfied with my purchase.",
    },
  ];
  

export default function FeedbackSliderr() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[200px] overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-80" />

      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-2xl px-4">
          <p className="text-3xl font-bold text-white mb-2">
            {slide.CustomerName + "'s said"} 
          </p>
          <p className="text-xl text-white italic">
            “{slide.Feedback}”
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
