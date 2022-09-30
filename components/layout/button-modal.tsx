import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  FormErrorMessage,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRef,useState,useEffect } from "react";
import * as yup from "yup";
import { ApiResponse, WorkspaceRes, WorkspaceTypeRes } from "../../models";
import { clientJWT } from "../../middleware";
import { getApiWorkspace, getApiWorkspaceType } from "../../helpers";

function ModalCreateWorkspace(props: any) {
  const { icon, label, ...buttonProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  var workspaceTypeData:WorkspaceTypeRes[]|any
  const [workspaceType, setWorkspaceType] = useState(workspaceTypeData);
  useEffect(() => {
    (async () => {
      let Data = await getApiWorkspaceType();
    setWorkspaceType(Data); // sets ariaInfo state
    })()
  }, []);

 
  async function submitHandlerWorkspace(value: any) {
    try {
      const result: ApiResponse<WorkspaceRes> = await addWorkspace(
        value.workspaceName,
        value.workspaceType,
        value.workspaceDescription
      );
      if (result && result.TransactionStatus.IsSuccess == true) {
        alert("Workspace created successfully!");
      } else {
        alert(result.TransactionStatus.Error.Description);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button
        onClick={ onOpen}
        variant="ghost"
        justifyContent="start"
        {...buttonProps}
      >
        {props.ButtonText}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.ModalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                workspaceName: "",
                workspaceType: "",
                workspaceDescription: "",
              }}
              validationSchema={yup.object({
                workspaceName: yup
                  .string()
                  .trim()
                  .required("Workspace Name is required"),
                workspaceType: yup
                  .string()
                  .trim()
                  .required("Workspace Type is required"),
              })}
              onSubmit={async (values, actions) => {
                await submitHandlerWorkspace(values);
                //alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
                onClose();
              }}
            >
              {(props) => (
                <Form>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <Field name="workspaceName">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.workspaceName &&
                              form.touched.workspaceName
                            }
                          >
                            <FormLabel htmlFor="workspaceName">
                              Workspace Name
                            </FormLabel>
                            <Input
                              id="workspaceName"
                              type="text"
                              variant={"filled"}
                              {...field}
                            />
                            <FormErrorMessage>
                              {props.errors.workspaceName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="workspaceType">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.workspaceType &&
                              form.touched.workspaceType
                            }
                          >
                            <FormLabel htmlFor="workspaceType">
                              Workspace Type
                            </FormLabel>
                            <Select
                              placeholder="Select Workspace Type"
                              id="email"
                              variant={"filled"}
                              {...field}
                            >
                              {workspaceType?workspaceType.map((item:any) => (
                                <option value={item.id}>
                                  {item.WorkspaceType}
                                </option>
                              )):""}
                            </Select>
                            <FormErrorMessage>
                              {props.errors.workspaceType}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="workspaceDescription">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.workspaceDescription &&
                              form.touched.workspaceDescription
                            }
                          >
                            <FormLabel htmlFor="workspaceDescription">
                              workspaceDescription
                            </FormLabel>
                            <Input
                              id="workspaceDescription"
                              type="tel"
                              variant={"filled"}
                              {...field}
                            />
                            <FormErrorMessage>
                              {props.errors.workspaceDescription}
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
                        Continue
                      </Button>
                      {/* <Button onClick={onClose}>Cancel</Button> */}
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
function ModalCreateBoard(props: any) {
  const { icon, label, ...buttonProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  var Data: WorkspaceRes[] | any;
  const [workspace, setWorkspace] = useState(Data);
  useEffect(() => {
    (async () => {
      let Data = await getApiWorkspace();
      setWorkspace(Data.Data); // sets ariaInfo state
    })();
  }, []);
  async function addApiBoard(
    BoardTitle: any,
    BackgroundId: any,
    Visibility: any,
    WorkspaceId: any,
    TemplateId: any,
  ) {
    const response = await fetch("/api/board", {
      method: "POST",
      body: JSON.stringify({ BoardTitle, BackgroundId, Visibility,WorkspaceId,TemplateId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + clientJWT(),
      },
    });
    const data: ApiResponse<WorkspaceRes> = await response.json();
    if (!data.TransactionStatus.IsSuccess) {
      throw new Error(
        data.TransactionStatus.Error.Type || "Something went wrong!"
      );
    }
    return data;
  }
  async function submitHandlerBoard(value: any) {
    try {
      alert(value.boardTitle)
      const result: ApiResponse<WorkspaceRes> = await addApiBoard(
        value.boardTitle,
        "",
        value.visibility,
        value.workspaceId,
        "",
      );
      if (result && result.TransactionStatus.IsSuccess == true) {
        alert("Board created successfully!");
      } else {
        alert(result.TransactionStatus.Error.Description);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        justifyContent="start"
        {...buttonProps}
      >
        {props.ButtonText}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.ModalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Formik
              initialValues={{
                boardTitle: "",
                workspaceId: "",
                visibility  : "",
              }}
              validationSchema={yup.object({
                boardTitle: yup
                  .string()
                  .trim()
                  .required("Board Title is required"),
                
              })}
              onSubmit={async (values, actions) => {
                await submitHandlerBoard(values);
                //alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
              }}
            >
              {(props) => (
                <Form>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <Field name="boardTitle">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.boardTitle &&
                              form.touched.boardTitle
                            }
                          >
                            <FormLabel htmlFor="boardTitle">
                              Board Title
                            </FormLabel>
                            <Input
                              id="boardTitle"
                              type="text"
                              variant={"filled"}
                              {...field}
                            />
                            <FormErrorMessage>
                              {props.errors.boardTitle}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="workspaceId">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.workspaceId &&
                              form.touched.workspaceId
                            }
                          >
                            <FormLabel htmlFor="workspaceId">
                              Workspace 
                            </FormLabel>
                            <Select
                              placeholder="Select Workspace "
                              id="workspaceId"
                              variant={"filled"}
                              {...field}
                            >
                              {workspace?workspace.map((item:any) => (
                                <option value={item.id}>
                                  {item.WorkspaceName}
                                </option>
                              )):""}
                            </Select>
                            <FormErrorMessage>
                              {props.errors.workspaceId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="visibility">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.visibility &&
                              form.touched.visibility
                            }
                          >
                            <FormLabel htmlFor="visibility">
                            Visibility
                            </FormLabel>
                            <Select
                              placeholder="Select Visibility "
                              id="workspaceId"
                              variant={"filled"}
                              {...field}
                            >                              
                                <option value={"Private"}>
                                  {"Private"}
                                </option>
                                <option value={"Workspace"}>
                                  {"Workspace"}
                                </option>
                                <option value={"Public"}>
                                  {"Public"}
                                </option>
                            </Select>
                            <FormErrorMessage>
                              {props.errors.visibility}
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
                      {/* <Button onClick={onClose}>Cancel</Button> */}
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function ModalCreateBoardWithTemplate(props: any) {
  const { icon, label, ...buttonProps } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        justifyContent="start"
        {...buttonProps}
      >
        {props.ButtonText}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.ModalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export { ModalCreateWorkspace, ModalCreateBoard, ModalCreateBoardWithTemplate };
  function addWorkspace(workspaceName: any, workspaceType: any, workspaceDescription: any): ApiResponse<WorkspaceRes> | PromiseLike<ApiResponse<WorkspaceRes>> {
    throw new Error("Function not implemented.");
  }

