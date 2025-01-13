import { Table, Image, Flex } from "@chakra-ui/react";
interface CustomTableProps {
    editOrDelete: (action: string, email: string) => void;
    detail: (email: string) => void;
    users: { name: string, email: string, level: number }[];
}
const CustomTable = ({ editOrDelete, detail,users }: CustomTableProps) => {
    const userLevel = Number(localStorage.getItem("level"));
    const handleImageClick = async (event: React.MouseEvent<HTMLImageElement>, action: string, email: string) => {
        event.stopPropagation();
        editOrDelete(action, email);
    };
    return (
        <Flex>
            <Table.Root w="70rem" color="black">
                <Table.Header>
                    <Table.Row bg="gray.100">
                        <Table.ColumnHeader color="black">Nome</Table.ColumnHeader>
                        <Table.ColumnHeader color="black">Email</Table.ColumnHeader>
                        <Table.ColumnHeader color="black">Nível de Acesso</Table.ColumnHeader>
                        {userLevel > 2 ? (<Table.ColumnHeader color="black"></Table.ColumnHeader>) : null}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map((user: { name: string, email: string, level: number }, index: number) => (
                        <Table.Row key={index} bg="gray.100" _hover={{ bg: "gray.200", cursor: "pointer" }} onClick={() => {
                            detail(user.email)
                        }}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.level}</Table.Cell>
                            {userLevel > 2 ? (<Table.Cell display="flex" justifyContent="space-around">
                                <Image
                                    _hover={{ cursor: "pointer" }}
                                    onClick={(event) => handleImageClick(event, "Editar usuário", user.email)}
                                    src="src/assets/Frame.png"
                                />
                                <Image
                                    src="src/assets/trash-2.png"
                                    _hover={{ cursor: "pointer" }}
                                    onClick={(event) => handleImageClick(event, "Deletar usuário", user.email)}
                                />
                            </Table.Cell>) : null}
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row bg="gray.100">
                        <Table.Cell colSpan={4}>Total de Usuários: {users.length}</Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table.Root>
        </Flex>
    );
};

export default CustomTable;