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

interface LogoutConfirmationProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  onLogout,
  isOpen,
  onClose,
}) => {
  const handleLogout = () => {
    onLogout(); // Call logout function passed as a prop
    onClose(); // Close the dialog after logout
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You will be redirected to the
            login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmation;
