"use client";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface EventFormProps {
  groupNum: number | undefined;
  availability: { [key: string]: { [type: string]: number } };
}

type FormValues = {
  groupNumber: number;
  highPriorityDescription: string;
  leastCompromisableProof: string;
};

export default function EventForm({
  groupNum = undefined,
  availability,
}: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { groupNumber: groupNum },
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
          <h3 className="font-medium">Kesibukan tersubmit</h3>
        </div>
        <p className="text-green-700">
          Terimakasih, kesibukan Anda telah tersubmit. Bobot kesibukan kelompok
          dapat dilihat dibawah.
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
      <h2 className="text-xl font-bold mb-4">Submit kesibukan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="groupNumber">Nomor Kelompok</Label>
          <Input
            id="groupNumber"
            placeholder="01"
            {...register("groupNumber", {
              required: "Nomor Kelompok wajib diisi",
            })}
          />
          {errors.groupNumber && (
            <p className="text-red-500 text-sm">{errors.eventName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="highPriorityDescription">
            Penjelasan kegiatan high priority
          </Label>
          <Textarea
            id="highPriorityDescription"
            placeholder="Contoh: selama 3 minggu ke depan, saya memiliki komitmen untuk mengikuti program magang pada perusahaan [...], selain itu saya juga mengikuti MBKM [...] sampai [...] dan mengambil mata kuliah pilihan [...] yang mana kuliahnya diselenggarakan pada jadwal [...]. Selain itu, kesibukan-kesibukan ini membutuhkan fokus dan waktu ekstra khusus terutama pada hari [...] dari jam [...] sampai [...] karena [...] sehingga saya lebih berkenan apabila tidak mendapatkan jadwal ekfis di jam-jam tersebut"
            {...register("description")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="leastCompromisableProof">
            Link bukti untuk kategori Least Compromisable
          </Label>
          <Textarea
            id="leastCompromisableProof"
            placeholder="Contoh: <link screenshot KSM & jadwal SIX> <link surat keterangan kerja>"
            {...register("description")}
          />
          <p className="text-red-500 text-sm">
            Bukti hanya dianggap sah apabila dapat diakses oleh kami. (tip:
            paste linknya ke tab incognito, kalo bisa dibuka berarti aman 👍)
          </p>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* <div className="space-y-2">
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
        </div> */}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
