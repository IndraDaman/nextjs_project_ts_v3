import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  LinkBox,
  Link,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { ModalCreateBoard, ModalCreateWorkspace } from "./button-modal";

function ButtonPopover(props: any) {
  const { icon, label, ...buttonProps } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Button {...buttonProps}>{props.ButtonText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={"black"} />
        <PopoverHeader color={"black"} textAlign={"center"}>
          {props.Heading}
        </PopoverHeader>
        <PopoverBody color={"black"}>
          <LinkBox as="article" maxW="sm" p="5">
            <NextLink href={"/auth/login"} passHref>
              <Link color={"blue.400"}>Chakra Design system</Link>
            </NextLink>
          </LinkBox>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
function WorkspaceButtonPopover(props: any) {
  const { icon, label, ...buttonProps } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Button {...buttonProps}>{props.ButtonText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={"black"} />
        <PopoverHeader color={"black"} textAlign={"center"}>
          {props.Heading}
        </PopoverHeader>
        <PopoverBody color={"black"}>
          <LinkBox as="article" maxW="sm" p="5">
            {props.workspace ? (
              props.workspace.map((item: any,key:number) => (
                <NextLink href={"#"} passHref key={key}>
                  <Link color={"blue.400"}>{item.WorkspaceName}</Link>
                </NextLink>
              ))
            ) : (
              <NextLink href={"/auth/login"} passHref>
                <Link color={"blue.400"}>Chakra Design system</Link>
              </NextLink>
            )}
          </LinkBox>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
function TemplateButtonPopover(props: any) {
  const { icon, label, ...buttonProps } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Button {...buttonProps}>{props.ButtonText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={"black"} />
        <PopoverHeader color={"black"} textAlign={"center"}>
          {props.Heading}
        </PopoverHeader>
        <PopoverBody color={"black"}>
          <LinkBox as="article" maxW="sm" p="5">
            {props.template ? (
              props.template.map((item: any,key:number) => (
                <NextLink href={"#"} passHref key={key}> 
                  <Link color={"blue.400"}>{item.Template}</Link>
                </NextLink>
              ))
            ) : (
              <NextLink href={"/auth/login"} passHref>
                <Link color={"blue.400"}>Chakra Design system</Link>
              </NextLink>
            )}
          </LinkBox>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
function CreateButtonPopover(props: any) {
  const { icon, label, ...buttonProps } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Button {...buttonProps}>{props.ButtonText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={"black"} />
        <PopoverHeader color={"black"} textAlign={"center"}>
          Create
        </PopoverHeader>
        <PopoverBody color={"black"}>
          <ul>
            <li>
              {/* <NextLink href={"/auth/login"} passHref>
                <Link color={"blue.400"}>Create Board</Link>
              </NextLink> */}
              <ModalCreateBoard
                ButtonText={"Create Board"}
                ModalHeader={"Create Board"}
              />
            </li>
            <li>
              <ModalCreateBoard
                ButtonText={"Start with a template"}
                ModalHeader={"Create from template"}
              />
            </li>
            <li>
              <ModalCreateWorkspace
                ButtonText={"Create Workspace"}
                ModalHeader={"Let's build a Workspace"}
              />
            </li>
          </ul>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
export {
  ButtonPopover,
  WorkspaceButtonPopover,
  TemplateButtonPopover,
  CreateButtonPopover,
};
