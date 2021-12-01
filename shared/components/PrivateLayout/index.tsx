import { ReactNode, useContext, useEffect, useState } from "react";
import { setRequestInterceptor } from "../../../application/services/axiosInstances/spotifyApi";
import { useRouter } from "next/router";
import Header from "../Header";
import { ProfileContext } from "../../../application/contexts/ProfileContext";
import AuthenticationService from "../../../application/services/AuthenticationService";

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({
  children,
}: PrivateLayoutProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();
  const { profile } = useContext(ProfileContext);

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

  if (isLoading) return <div>Loading...</div>;

  return <main>{children}</main>;
}
