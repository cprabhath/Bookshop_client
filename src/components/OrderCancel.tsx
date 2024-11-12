import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"; // Adjust the import path as necessary
import AxiosInstance from "../lib/AxiosInstence";
import { useToast } from "../hooks/use-toast";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  Orderid: string;
    id: string;
}

const OrderCancel: React.FC<LogoutConfirmationProps> = ({
  isOpen,
  onClose,
  Orderid,
  id
}) => {
    const { toast } = useToast();
  const handleCancel = () => {
    AxiosInstance.put(`/Order/status/${id}`, "Cancelled")
      .then(() => {
        toast({
          title: "Order Cancelled",
          description: "Your order has been cancelled successfully",
          variant: "success",
        });
        window.location.reload();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order #{Orderid} Cancellation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to cancel the order?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>
            Yes. Cancel this order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderCancel;
