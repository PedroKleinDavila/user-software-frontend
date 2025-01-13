import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { deleteUser } from "../services/userService";

interface DeleteModalProps {
    email: string;
    closeDelete: (value: boolean) => void;
    workedDelete: (value: boolean) => void;
}
const DeleteModal = ({email,closeDelete, workedDelete}:DeleteModalProps) => {
  return (
    <Box
                                position="fixed"
                                color="black"
                                top="0"
                                left="0"
                                width="100vw"
                                height="100vh"
                                bg="rgba(0, 0, 0, 0.5)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                zIndex="1000"
                            >
                                <Box
                                    bg="white"
                                    p="2rem"
                                    borderRadius="0.5rem"
                                    boxShadow="lg"
                                    textAlign="center"
                                    maxWidth="400px"
                                    width="90%"
                                >
                                    <Text fontSize="1.5rem" fontWeight="bold" mb="1rem">
                                        Confirmar Exclusão
                                    </Text>
                                    <Text mb="2rem">
                                        Tem certeza de que deseja excluir o usuário com e-mail:{" "}
                                        <strong>{email}</strong>?
                                    </Text>
                                    <Flex justifyContent="center" gap="1rem">
                                        <Button
                                            bg="red.600"
                                            color="white"
                                            _hover={{ bg: "red.500" }}
                                            onClick={async () => {
                                                const success = await deleteUser(email);
                                                if (success) {
                                                    workedDelete(true);
                                                }
                                            }
                                            }
                                        >
                                            Confirmar
                                        </Button>
                                        <Button
                                            bg="gray.300"
                                            color="black"
                                            _hover={{ bg: "gray.200" }}
                                            onClick={() => closeDelete(true)}
                                        >
                                            Cancelar
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
  );
}

export default DeleteModal;