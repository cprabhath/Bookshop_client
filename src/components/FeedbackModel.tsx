import { useState } from "react";
import { Input } from "./ui/input";
import { Mail, MessageSquare } from "lucide-react"; // Importing icons
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Textarea } from "./ui/textarea";

interface FeedbackModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModel({ isOpen, onClose }: FeedbackModelProps) {
  const [formData, setFormData] = useState({
    email: "",
    feedback: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log("Feedback submitted:", formData);
    // Clear form after submission
    setFormData({ email: "", feedback: "" });
    onClose(); // Close modal after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
            We Value Your Feedback!
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback
            </label>
            <div className="relative mt-1">
              <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) =>
                  setFormData({ ...formData, feedback: e.target.value })
                }
                placeholder="Enter your feedback"
                className="resize-none h-24 pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                required
                autoComplete="off"
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <button onClick={onClose} className="text-primary-600 font-medium">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-600 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-700 transition"
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
