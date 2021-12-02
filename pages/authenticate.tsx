import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthenticationService from "../application/services/AuthenticationService";
import LoadingContainer from "../shared/components/LoadingContainer";

export default function Authenticate() {
  const router = useRouter();

  useEffect(() => {
    console.log(window.location.hash);
  }, []);

  useEffect(() => {
    AuthenticationService.setToken()
      .then(() => {
        router.push("/search");
      })
      .catch(() => router.push("/"));
  }, []);
  return <LoadingContainer />;
}
