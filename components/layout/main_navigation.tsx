import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/router";
import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from "react-icons/fi";
import { Logo } from "./logo";
import {
  clientJWT,
  clientLoginAuthorization,
  clientLogout,
  getLocalUser,
} from "../../middleware";
import {
  getApiTemplate,
  getApiWorkspace,
  RoleDetail,
} from "../../helpers";
import {
  ButtonPopover,
  CreateButtonPopover,
  TemplateButtonPopover,
  WorkspaceButtonPopover,
} from "./button-popover";
import { TemplateRes, WorkspaceRes } from "../../models";
import { useEffect, useState } from "react";
import NextLink from "next/link";

export function MainNavigation() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const jwt = clientJWT();
  const userDetail: any = getLocalUser();
  console.log(userDetail.Role);
  const route = useRouter();
  const isLogin = clientLoginAuthorization();
  async function logout() {
    const result = await clientLogout();
    if (result) {
      route.push("/auth/login");
    }
  }
  function workspaceClick(msg: any) {
    alert(msg);
  }
  function openAddBoard(event: any) {
    event.preventDefault();
  }
  var Data: WorkspaceRes[] | any;
  const [workspace, setWorkspace] = useState(Data);
  var DataTemplate: TemplateRes[] | any;
  const [template, setTemplate] = useState(DataTemplate);
  useEffect(() => {
    (async () => {
      let Data = await getApiWorkspace();
      setWorkspace(Data.Data); // sets ariaInfo state
      let DataTemplate = await getApiTemplate();
      setTemplate(DataTemplate.Data); // sets ariaInfo state
    })();
  }, []);
  return (
    <Box as="section" pb={{ base: "12", md: "0" }}>
      <Box as="nav" bg="bg-accent" color="on-accent">
        <Container py={{ base: "3", lg: "2" }}>
          <Flex justify="space-between">
            <HStack spacing="4">
              <NextLink href={"/"} passHref>
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={400}
                  color={"white"}
                  variant={"link"}
                  _hover={{
                    color: "white",
                  }}
                >
                  <Logo />
                </Button>
              </NextLink>
              {isDesktop && (
                //(isLogin ?
                <ButtonGroup variant="ghost-on-accent" spacing="1">
                  <WorkspaceButtonPopover
                    onPopoverButtonClick={workspaceClick}
                    ButtonText={"Workspace"}
                    Heading={"Workspace"}
                    Body={`Click`}
                    workspace={workspace}
                  />
                  {/* <Button>Workspace</Button> */}
                  <ButtonPopover
                    onPopoverButtonClick={workspaceClick}
                    ButtonText={"Recent"}
                    Heading={"Recent"}
                    Body={`Description`}
                  />
                  <ButtonPopover
                    onPopoverButtonClick={workspaceClick}
                    ButtonText={"Starred"}
                    Heading={"Starred"}
                    Body={`Description`}
                  />
                  <TemplateButtonPopover
                    onPopoverButtonClick={workspaceClick}
                    ButtonText={"Template"}
                    Heading={"Template"}
                    Body={`Description`}
                    template={template}
                  />

                  {userDetail && userDetail.Role == RoleDetail.Admin && (
                    <>
                      <CreateButtonPopover ButtonText={"Create"} />
                      <NextLink href={"/users"} passHref>
                        <Button
                          as={"a"}
                          fontSize={"sm"}
                          fontWeight={400}
                          color={"white"}
                          variant={"link"}
                          _hover={{
                            color: "white",
                          }}
                        >
                          User
                        </Button>
                      </NextLink>
                    </>
                  )}
                  {/* <ButtonModal/> */}
                </ButtonGroup>
                // ) : (
                //   <ButtonGroup variant="ghost-on-accent" spacing="1">
                //     <Button>Home</Button>
                //     <Button aria-current="page">Dashboard</Button>
                //     <Button>Tasks</Button>
                //     <Button>Bookmarks</Button>
                //     <Button>Users</Button>
                //   </ButtonGroup>
                // )
              )}
            </HStack>
            {isDesktop ? (
              <>
                {isLogin ? (
                  <HStack spacing="4">
                    <ButtonGroup variant="ghost-on-accent" spacing="1">
                      <IconButton
                        icon={<FiSearch fontSize="1.25rem" />}
                        aria-label="Search"
                      />
                      <IconButton
                        icon={<FiSettings fontSize="1.25rem" />}
                        aria-label="Settings"
                      />
                      <IconButton
                        icon={<FiHelpCircle fontSize="1.25rem" />}
                        aria-label="Help Center"
                      />
                    </ButtonGroup>
                    <Avatar
                      boxSize="10"
                      name="Christoph Winston"
                      src="https://tinyurl.com/yhkm2ek8"
                    />
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      variant="primary"
                      onClick={async () => await logout()}
                      _hover={{
                        bg: "blue.300",
                      }}
                    >
                      Logout
                    </Button>
                  </HStack>
                ) : (
                  <HStack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                  >
                    <Button
                      as={"a"}
                      fontSize={"sm"}
                      fontWeight={400}
                      color={"white"}
                      variant={"link"}
                      _hover={{
                        color: "white",
                      }}
                      href={"/auth/login"}
                    >
                      Login
                    </Button>
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      variant="primary"
                      onClick={() => route.push("/auth/signup")}
                      _hover={{
                        bg: "blue.300",
                      }}
                    >
                      Sign Up
                    </Button>
                  </HStack>
                )}
              </>
            ) : (
              <IconButton
                variant="ghost-on-accent"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
