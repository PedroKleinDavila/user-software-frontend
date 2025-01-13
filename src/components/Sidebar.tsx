import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cardapio from "../assets/cardapio.png";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Flex position="relative" h="100vh">
            <Box
                position="fixed"
                left={isOpen ? "0" : "-15rem"}
                top="0"
                h="100vh"
                w="15rem"
                bg="gray.100"
                color="black"
                p="1rem"
                transition="left 0.3s ease-in-out"
                zIndex="10"
            >
                <Text fontSize="1.5rem" fontWeight="bold" mb="2rem" textAlign="center">
                    Menu
                </Text>
                <Flex direction="column" h="85vh">
                    <Button
                        borderRadius="1rem"
                        mb="1rem"
                        color="white"
                        bg="green.700"
                        _hover={{ bg: "green.600" }}
                        onClick={() => navigate("/usuarios")}
                    >
                        Usuários
                    </Button>
                    {/* <Button
                        borderRadius="1rem"
                        mb="1rem"
                        color="white"
                        bg="green.700"
                        _hover={{ bg: "green.600" }}
                        onClick={() => navigate("/pagina1")}
                    >
                        Produtos
                    </Button> */}
                    <Flex flex={1}></Flex>
                    <Button
                        borderRadius="1rem"
                        mb="1rem"
                        color="white"
                        bg="red.600"
                        _hover={{ bg: "red.500" }}
                        onClick={() => {navigate("/");localStorage.removeItem("user");localStorage.removeItem("email");}}
                    >
                        Log out
                    </Button>
                </Flex>
            </Box>

            <Button
                position="fixed"
                ml="1rem"
                top="1rem"
                borderRadius="3rem"
                color="white"
                bg="transparent"
                aria-label="Toggle Sidebar"
                onClick={toggleSidebar}
                bgImage={`url(${cardapio})`}
                bgSize="contain"
                transition="left 0.3s ease-in-out"
                zIndex="20"
            />
        </Flex>
    );
};

export default Sidebar;
