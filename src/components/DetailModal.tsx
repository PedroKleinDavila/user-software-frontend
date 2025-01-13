import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { IUser } from "../types/types";
interface ModalProps {
    user:IUser;
    close: (value: boolean) => void;
}
const DetailModal = ({ user, close }: ModalProps) => {
    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="rgba(0, 0, 0, 0.5)"
            align="center"
            justify="center"
        >
            <Box
                bg="white"
                p="2rem"
                borderRadius="0.5rem"
                shadow="lg"
                minWidth="300px"
                color="black"
            >
                <Text fontSize="lg" mb="1rem">
                    Informações do Usuário
                </Text>
                <Text fontSize="md" mb="1rem">
                    <strong>Nome:</strong> {user.name}
                </Text>
                <Text fontSize="md" mb="1rem">
                    <strong>Email:</strong> {user.email}
                </Text>
                <Text fontSize="md" mb="1rem">
                    <strong>Nível de Acesso:</strong> {user.level}
                </Text>
                <Text fontSize="md" mb="1rem">
                    <strong>Senha:</strong> {user.password}
                </Text>
                <Flex justify="flex-end">
                    <Button
                        bg="gray.500"
                        color="white"
                        _hover={{ bg: "gray.400" }}
                        onClick={() => close(true)}
                    >
                        Fechar
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

export default DetailModal;