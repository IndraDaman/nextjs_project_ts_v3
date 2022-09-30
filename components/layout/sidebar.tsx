import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FiBarChart,
  FiCloud,
  FiEye,
  FiHeart,
  FiHome,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { NavButton } from "./button-sidebar";
import { ModalCreateWorkspace } from "./button-modal";
import { WorkspaceRes } from "../../models";
import { useEffect, useState } from "react";
import { getApiWorkspace, RoleDetail } from "../../helpers";
import { getLocalUser } from "../../middleware";

export const Sidebar = () => {
  var Data: WorkspaceRes[] | any;
  const [workspace, setWorkspace] = useState(Data);
  const [userDetail, setUserDetail] = useState(Data);

  useEffect(() => {
    (async () => {
      let Data = await getApiWorkspace();
      setWorkspace(Data.Data); // sets ariaInfo state
      const userDetail = getLocalUser();
      setUserDetail(userDetail);
    })();
  }, []);
  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1" width="full">
          <Stack spacing="8" shouldWrapChildren>
            <Stack spacing="1">
              <NavButton label="Board" icon={FiBarChart} />
              <NavButton label="Templates" icon={FiCloud} />
              <NavButton label="Home" icon={FiHome} />
            </Stack>
            <Stack>
              <Stack>
                <HStack float={"left"} width={"10%"}>
                  <Text fontSize="sm" color="subtle" fontWeight="medium">
                    Media
                  </Text>
                </HStack>
                <HStack float={"right"} width={"10%"}>
                  {userDetail && userDetail.Role == RoleDetail.Admin && (
                    <ModalCreateWorkspace
                      ButtonText={"+"}
                      ModalHeader={"Let's build a Workspace"}
                    />
                  )}
                </HStack>
              </Stack>
              4
              <Accordion allowMultiple>
                {workspace
                  ? workspace.map((item: any, key: number) => (
                      <AccordionItem key={key}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {item.WorkspaceName}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Stack spacing="1">
                            <Stack spacing="1">
                              <NavButton label="Boards" icon={FiBarChart} />
                              <NavButton label="Highlights" icon={FiHeart} />
                              <NavButton label="Views" icon={FiEye} />
                              <NavButton label="Members" icon={FiUser} />
                              <NavButton label="Settings" icon={FiSettings} />
                            </Stack>
                          </Stack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))
                  : ""}
              </Accordion>
            </Stack>

            {/* <Stack>
            <Text fontSize="sm" color="subtle" fontWeight="medium">
              Social
            </Text>
            <Stack spacing="1">
              <NavButton label="Twitter" icon={FiTwitter} />
              <NavButton label="Instagram" icon={FiInstagram} />
              <NavButton label="Linkedin" icon={FiLinkedin} />
            </Stack>
          </Stack> */}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
