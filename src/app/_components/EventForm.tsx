"use client";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface EventFormProps {
  username: string;
  availability: { [key: string]: { [type: string]: number } };
}

type FormValues = {
  eventName: string;
  description: string;
  name: string;
  email: string;
};

export default function EventForm({ username, availability }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: username,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically send the data to your backend
    console.log("Form submitted with:", {
      ...data,
      availability,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-8">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Check size={20} />
          <h3 className="font-medium">Availability Submitted Successfully!</h3>
        </div>
        <p className="text-green-700">
          Your availability has been saved. Thank you for your submission.
        </p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 border rounded-md p-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Submit Your Availability</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            placeholder="Team Meeting"
            {...register("eventName", { required: "Event name is required" })}
          />
          {errors.eventName && (
            <p className="text-red-500 text-sm">{errors.eventName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Weekly team sync to discuss project progress..."
            {...register("description")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name", { required: "Your name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Availability"
          )}
        </Button>
      </form>
    </div>
  );
}
