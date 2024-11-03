"use client";
import { useRouter } from "@/i18n/routing";
import { LoadScript } from "@react-google-maps/api";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      onError={() => {}}
      loadingElement={<></>}
    >
      {children}
    </LoadScript>
  );
};

export default layout;
