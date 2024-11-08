import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import { Input } from "./ui/input";

interface PasswordChangeProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordChange = ({ isOpen, onClose }: PasswordChangeProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "" || newPassword === "") {
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the fields",
        variant: "info",
      });
    }

    if (password !== newPassword) {
      toast({
        title: "Uh oh! Something went wrong. 😕",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    // Add logic to change password
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your current password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
            />
          </div>
        </form>
        <DialogFooter>
          <button onClick={onClose} className="text-primary-600 font-medium">
            Cancel
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-primary-600 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-700 transition"
          >
            Change Password
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChange;
