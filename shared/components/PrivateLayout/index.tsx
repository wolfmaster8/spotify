import { ReactNode, useEffect, useState } from "react";
import { UilMusic } from "@iconscout/react-unicons";
import { setRequestInterceptor } from "../../../application/services/axiosInstances/spotifyApi";
import { useRouter } from "next/router";

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({
  children,
}: PrivateLayoutProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();

  useEffect(() => {
    handleAuthentication();
  }, []);

  const handleAuthentication = () => {
    try {
      if (!sessionStorage.getItem("accessToken")) {
        throw new Error("error");
      }
      setIsLoading(false);
      setRequestInterceptor();
    } catch (e) {
      push("/");
    }
  };

  if (isLoading)
    return (
      <div className=" flex flex-col items-center justify-center min-h-screen w-full">
        <UilMusic className="text-blue-600 mr-2 animate-pulse w-8 h-8" />
        <p className="text-lg text-blue-700 font-semibold">Loading...</p>
      </div>
    );

  return <main>{children}</main>;
}
