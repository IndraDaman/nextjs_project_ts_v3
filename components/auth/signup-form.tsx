import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import NextLink from "next/link";
import { Logo2 } from "../layout";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { ApiResponse, UserRes } from "../../models";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  async function createUser(
    firstName: any,
    lastName: any,
    email: any,
    phone: any,
    password: any
  ) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, phone, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ApiResponse<UserRes> = await response.json();
    if (!data.TransactionStatus.IsSuccess) {
      throw new Error(
        data.TransactionStatus.Error.Type || "Something went wrong!"
      );
    }
    return data;
  }
  async function submitHandler(value: any) {
    try {
      const result: ApiResponse<UserRes> = await createUser(
        value.firstName,
        value.lastName,
        value.email,
        value.phone,
        value.password
      );
      if (result && result.TransactionStatus.IsSuccess == true) {
        alert("User created successfully!");
      } else {
        alert(result.TransactionStatus.Error.Description);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex align="center" justify="center" h="110vh">
      <Box p={6}>
        <Stack spacing="4">
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
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
          }}
          validationSchema={yup.object({
            firstName: yup.string().trim().required("Name is required"),
            email: yup
              .string()
              .trim()
              .required("email is required")
              .email("enter correct email id."),
            phone: yup
              .string()
              .trim()
              .required("phone is required")
              .max(10, "length cannot greater than 10"),
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
                  <HStack>
                    <Box>
                      <Field name="firstName">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel htmlFor="firstname">
                              First Name
                            </FormLabel>
                            <Input
                              id="firstname"
                              type="text"
                              variant={"filled"}
                              placeholder="Enter your first name"
                              {...field}
                            />
                            <FormErrorMessage>
                              {props.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="lastName">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input
                              id="lastName"
                              type="text"
                              variant={"filled"}
                              placeholder="Enter your last name"
                              {...field}
                            />
                            <FormErrorMessage>
                              {props.errors.lastName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </HStack>
                  <Field name="email">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          variant={"filled"}
                          {...field}
                        />
                        <FormErrorMessage>
                          {props.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone"
                          variant={"filled"}
                          {...field}
                        />
                        <FormErrorMessage>
                          {props.errors.phone}
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
                        <InputGroup>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            variant={"filled"}
                            {...field}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {props.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <Stack spacing="4">
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Submit
                  </Button>
                </Stack>
                <HStack justify="center" spacing="1">
                  <Text fontSize="sm" color="muted">
                    Already have an account?
                  </Text>
                  <NextLink href={"/auth/login"} passHref>
                    <Link color={"blue.400"}>Login</Link>
                  </NextLink>
                </HStack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
