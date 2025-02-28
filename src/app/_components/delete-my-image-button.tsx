"use client";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function DeleteMyImageButton({ imageId }: { imageId: number }) {
  const router = useRouter();
  const deleteMyImage = api.image.deleteMyImage.useMutation();

  async function DeleteMyImage() {
    const toastDeletingId = toast.loading("Deleting image...");
    try {
      await deleteMyImage.mutateAsync({ imageId });
      router.refresh();
      toast.success("Image deleted");
    } catch (e) {
      toast.error("Failed to delete image" + JSON.stringify(e));
    } finally {
      toast.dismiss(toastDeletingId);
    }
  }
  return (
    <div>
      <Button
        type="submit"
        variant="destructive"
        onClick={async () => {
          await DeleteMyImage();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
