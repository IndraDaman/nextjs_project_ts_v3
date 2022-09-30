import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {MainNavigation} from "./main_navigation";

function Layout(props:any){
  const router = useRouter()
    return (
        <>
        {router.pathname!='/auth/signup' && router.pathname!='/auth/login' && <MainNavigation />}
          
        <Container> <main>{props.children}</main></Container>
        </>
      );
}
export {Layout};