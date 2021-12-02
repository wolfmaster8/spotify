import { ReactNode, useEffect, useState } from "react";
import { UilMusic } from "@iconscout/react-unicons";
import { setRequestInterceptor } from "../../../application/services/axiosInstances/spotifyApi";
import { useRouter } from "next/router";
import LoadingContainer from "../LoadingContainer";

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

  if (isLoading) return <LoadingContainer />;

  return <main>{children}</main>;
}
