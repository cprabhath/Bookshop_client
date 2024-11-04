import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.gr-assets.com/misc/1648226023-1648226023_goodreads_misc.png',
    title: 'Your Summer Escape Awaits',
    subtitle: 'Bestselling beach reads for every vibe',
    cta: 'Shop Now'
  },
  {
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/newscms/2022_48/1943520/most-anticipated-books-2023-use-2x1-jp-221127.jpg',
    title: 'Dive into Literary Masterpieces',
    subtitle: 'Stories that stand the test of time',
    cta: 'Explore Classics'
  },
  {
    image: 'https://gobookmart.com/wp-content/uploads/2022/05/8-Most-Anticipated-Books-Releasing-in-June-2022-1140x641.jpg',
    title: 'Hot Off the Press',
    subtitle: 'Discover this season’s must-reads',
    cta: 'View Collection'
  }
];


export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-80" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-2xl px-4">
              <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-white mb-8">{slide.subtitle}</p>
              <Link to="/shop" className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors">
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}