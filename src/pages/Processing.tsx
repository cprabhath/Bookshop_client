import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AxiosInstance from "../lib/AxiosInstence";

const Processing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const sessionId = searchParams.get("sessionId");
      const customerId = JSON.parse(localStorage.getItem("UserDetails") || "{}").id;

      const cartItem = JSON.parse(localStorage.getItem("cartItems") || "[]");

      const cartItems = cartItem.map((item: { id: number; quantity: number; price: number; }) => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const ConfirmOrderRequest = {
        sessionId,
        customerId,
        cartItems,
      }

      console.log(ConfirmOrderRequest);

      AxiosInstance.post("/Payments/confirm-order", ConfirmOrderRequest)
        .then((response) => {
          navigate(`/payment/complete?orderId=${response.data.orderNumber}`);
          localStorage.removeItem("cartItems");
        })
        .catch(() => {
          navigate("/payment/cancelled");
        });
    }, 5000);
  }, [navigate, searchParams]);

  return (
    <main className="min-h-screen pt-12 pb-16 bg-gradient-to-br from-sky-100 via-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border shadow-md p-8 text-center">
          <div className="w-28 h-28 flex items-center justify-center mx-auto mb-4">
            <img src="./assets/shopping-cart.gif" alt="Save" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please wait...
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your payment is being processed. Please wait a moment. You will be
            redirected to the confirmation page.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Processing;
