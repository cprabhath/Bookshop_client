import { CheckCircle, ArrowRight, Home, MailCheck, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentCompleted() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      window.location.href = "/payment/cancelled";
      return;
    }
    setOrderId(orderId);
  }, [searchParams]);

  return (
    <main className="min-h-screen pt-12 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-600">
              <p>Order Number: #{orderId}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Payment Method: Credit Card</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/home/orders"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              View Orders
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2 font-bold">Step 1</div>
              <MailCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">Order Confirmation Email Sent</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2 font-bold">Step 2</div>
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Order Processing & Packaging</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2 font-bold">Step 3</div>
                <Truck className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-gray-600">Shipping & Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}