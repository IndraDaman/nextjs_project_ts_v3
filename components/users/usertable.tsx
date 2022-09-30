import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { ModalUserAccess } from ".";
import { UserRes } from "../../models";

function UserTable(_props: any) {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Action</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {_props.userList ? (
            _props.userList.map((item: UserRes, key: number) => (
              <Tr key={key}>
                <Td>
                 {item.Role=="" && <ModalUserAccess
                    icon={FiUser}
                    modalheader={"User Access"}
                    userId={item.id}
                    workspace={_props.workspace}
                    board={_props.board}
                    userRole={_props.userRole}
                  />
            }
                </Td>
                <Td>
                  {item.FirstName +
                    (item.LastName && item.LastName != "" ? item.LastName : "")}
                </Td>
                <Td>{item.Email}</Td>
                <Td>{item.Phone}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>No record found!</Td>
            </Tr>
          )}
        </Tbody>
        {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
      </Table>
    </TableContainer>
  );
}

export { UserTable };
