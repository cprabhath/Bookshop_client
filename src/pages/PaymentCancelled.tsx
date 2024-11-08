import { XCircle, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentCancelled() {
  return (
    <main className="min-h-screen pt-12 pb-16 bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your payment was cancelled. Don't worry - no charges were made to
            your account.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Common Reasons for Cancellation
            </h2>
            <ul className="space-y-2 text-gray-600 text-left list-disc list-inside">
              <li>Payment method declined</li>
              <li>Transaction timeout</li>
              <li>Manual cancellation</li>
              <li>Connection issues</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-black rounded-lg hover:bg-red-600 transition-colors"
            >
              <RefreshCcw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg border shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you continue to experience issues with your payment, please try
              the following:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-2">
                  1
                </span>
                Verify your payment method has sufficient funds
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-2">
                  2
                </span>
                Check your internet connection
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-2">
                  3
                </span>
                Try a different payment method
              </li>
            </ul>
            <div className="mt-6 text-center">
              <Link
                to="/contact"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
