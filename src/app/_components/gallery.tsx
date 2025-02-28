export const dynamic = "force-dynamic";

import { api } from "~/trpc/server";

import { DeleteMyImageButton } from "./delete-my-image-button";
export async function Gallery() {
  const images = await api.image.getMyImages();
  return (
    <div className="flex flex-wrap">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col p-4">
          <img src={image.url} alt="image" />
          <p>{image.name}</p>
          <DeleteMyImageButton imageId={image.id} />
        </div>
      ))}
    </div>
  );
}
