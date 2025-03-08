"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
// import { bindNimWithUserAction } from "~/utils/server-actions";
import { api, RouterOutputs } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  NIM: z.string().min(1, {
    message: "NIM harus terisi",
  }),
});

export function NimForm() {
  const trpcClient = api.useContext();
  const bindNimWithUser = api.authorization.bindNimWithUser.useMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NIM: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated
    const statusToast = toast.loading("Submitting...");

    let bindNimWithUserReturn: RouterOutputs["authorization"]["bindNimWithUser"];
    try {
      const nim = Number(values.NIM.replace(/[^0-9]/g, "")); //sanitise to integer
      console.log(nim);

      bindNimWithUserReturn = await bindNimWithUser.mutateAsync({ nim });
      toast.info(bindNimWithUserReturn?.message);
      if (bindNimWithUserReturn?.isOk) {
        // window.location.reload();
        await trpcClient.invalidate();
      }
    } catch (e) {
      toast.error("Error: " + JSON.stringify(e));
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 20));
      toast.dismiss(statusToast);
    }
  }
  function onError(errors: unknown) {
    toast.error("Submission error" + JSON.stringify(errors));
    console.log("Error: ", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-row items-center"
      >
        <FormField
          control={form.control}
          name="NIM"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIM</FormLabel>
              <FormControl>
                <Input placeholder="1022xxxx" {...field} />
              </FormControl>
              <FormDescription>Masukkan NIM</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
