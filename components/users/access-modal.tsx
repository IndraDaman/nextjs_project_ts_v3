import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Icon, FormErrorMessage, Select, Stack } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useRef } from "react";
import * as yup from "yup";
import { editApiUsersAccess } from "../../helpers";
import { BoardRes, UserRoleRes, WorkspaceRes } from "../../models";

function ModalUserAccess(props: any) {
    const { userId,icon, modalheader,userRole,workspace,board, ...buttonProps } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const route = useRouter();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    async function submitUpdateUserAccess(value: any) {
        try {
          const result: any = await editApiUsersAccess(
            value.userId,
            value.role,
            value.workspace,
            value.board
          );
          if (result && result.TransactionStatus.IsSuccess == true) {
            alert("User access updated successfully!");
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
        <Icon as={icon} boxSize="6" color="subtle" />
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalheader}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <Formik
              initialValues={{
                userId:props.userId,
                role: "",
                workspace: "",
                board: "",
              }}
              validationSchema={yup.object({
                role: yup
                  .string()
                  .trim()
                  .required("Please select role."),
                  workspace: yup
                  .string()
                  .trim()
                  .required("Please select workspace."),
                  board: yup
                  .string()
                  .trim()
                  .required("Please select board."),
              })}
              onSubmit={async (values, actions) => {
                await submitUpdateUserAccess(values);
                //alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
                onClose();
                route.push("/users");
              }}
            >
              {(props) => (
                <Form>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <Field name="role">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.role &&
                              form.touched.role
                            }
                          >
                            <FormLabel htmlFor="role">
                              Role Name
                            </FormLabel>
                            <Select
                              placeholder="Select Role"
                              id="role"
                              variant={"filled"}
                              {...field}
                            >
                            {userRole?userRole.map((item:UserRoleRes,key:number ) => (
                                <option value={item.id} key={key}>
                                  {item.RoleName}
                                </option>
                              )):""}
                           </Select>
                            <FormErrorMessage>
                              {props.errors.role}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="workspace">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.workspace &&
                              form.touched.workspace
                            }
                          >
                            <FormLabel htmlFor="workspace">
                              Workspace
                            </FormLabel>
                            <Select
                              placeholder="Select Workspace"
                              id="workspace"
                              variant={"filled"}
                              {...field}
                            >
                              {workspace?workspace.map((item:WorkspaceRes,key:number ) => (
                                <option value={item.id} key={key}>
                                  {item.WorkspaceName}
                                </option>
                              )):""}
                            </Select>
                            <FormErrorMessage>
                              {props.errors.workspace}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="board">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.board &&
                              form.touched.board
                            }
                          >
                            <FormLabel htmlFor="board">
                              board
                            </FormLabel>
                            <Select
                              placeholder="Select Board"
                              id="board"
                              variant={"filled"}
                              {...field}
                            >
                              {board?board.map((item:BoardRes,key:number ) => (
                                <option value={item.id} key={key}>
                                  {item.BoardTitle}
                                </option>
                              )):""}
                            </Select>
                            <FormErrorMessage>
                              {props.errors.board}
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

  export {ModalUserAccess}