import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Logo2 } from "../layout";
import { LoginResponse } from "../../models";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { createLoginCookie, setLocalUser } from "../../middleware";
import { CommonAlertDialog } from "../alerts";

export function LoginForm() {
  const route = useRouter();
  async function loginUser(userName: any, password: any) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: LoginResponse = await response.json();
    return data;
  }
  async function submitHandler(value: any) {
    try {
      const result: LoginResponse = await loginUser(
        value.userName,
        value.password
      );
      if (result && result.TransactionStatus.IsSuccess == true) {
        // setCookie(cookieName, result.AccessToken, {
        //   path: "/",
        //   maxAge: 60 * 60 * 24,
        // });
        createLoginCookie(result.AccessToken);
        setLocalUser(result.Data ? result.Data : "");
        route.push("/");
      } else {
        alert(result.TransactionStatus.Error.Description);
        <CommonAlertDialog />
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container maxW="md" py={{ base: "12", md: "24" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo2 />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Log in to your account
            </Heading>
            <Text color="muted">Start making your dreams come true</Text>
          </Stack>
        </Stack>
        <Formik
          initialValues={{
            userName: "",
            password: "",
          }}
          validationSchema={yup.object({
            userName: yup
              .string()
              .trim()
              .required("email is required")
              .email("enter correct email id."),
            password: yup
              .string()
              .trim()
              .required("password is required")
              .max(15, "length cannot greater than 15")
              .min(8, "length cannot less than 8"),
          })}
          onSubmit={async (values, actions) => {
            await submitHandler(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form>
              <Stack spacing="6">
                <Stack spacing="5">
                  <Field name="userName">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={
                          form.errors.userName && form.touched.userName
                        }
                      >
                        <FormLabel htmlFor="userName">Email</FormLabel>
                        <Input
                          id="userName"
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                        />
                        <FormErrorMessage>
                          {props.errors.userName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          id="password"
                          placeholder="********"
                          type="password"
                          {...field}
                        />
                        <FormErrorMessage>
                          {props.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button
                    variant="link"
                    colorScheme="blue"
                    size="sm"
                    onClick={() => route.push("/auth/forgotpassword")}
                  >
                    Forgot password
                  </Button>
                </HStack>
                <Stack spacing="4">
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Sign in
                  </Button>
                  {/* <Button variant="secondary" leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3">
            Sign in with Google
          </Button> */}
                </Stack>
              </Stack>
              <HStack spacing="1" justify="center">
                <Text fontSize="sm" color="muted">
                  Don't have an account?
                </Text>
                <NextLink href={"/auth/signup"} passHref>
                  <Link color={"blue.400"}>SignUp</Link>
                </NextLink>
              </HStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}
