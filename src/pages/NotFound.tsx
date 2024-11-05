import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { motion } from "framer-motion"; // Ensure you have framer-motion installed

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: -80 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="./assets/404-error-page.gif"
          alt="Not Found"
          className="w-1/2 mx-auto"
        />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! It seems that the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-primary-500">
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
