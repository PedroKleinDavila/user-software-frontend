import { Global } from "@emotion/react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import CustomTable from "../components/Table";
import DeleteModal from "../components/DeleteModal";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import DetailModal from "../components/DetailModal";
import { decodeToken, findUser, getUsers } from "../services/userService";
import { IUser } from "../types/types";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
const Usuarios = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await decodeToken();
                if (token && token.email) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate("/");
                }
            } catch (error) {
                console.log("Error finding user:", error);
                setIsAuthenticated(false);
                localStorage.removeItem("level");
                localStorage.removeItem("email");
                navigate("/");
            }
        };

        checkAuthentication();
    }, [navigate]);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState(1);
    const [isAditionOpen, setisAditionOpen] = useState(false);
    const [isEditOpen, setisEditOpen] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, []);
    const reload = async () => {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
    }
    const editOrDelete = async (action: string, email: string) => {
        const user = await findUser(email);
        if (action === "Editar usuário") {
            setId(user.id);
            setName(user.name);
            setEmail(user.email);
            setLevel(Number(user.level));
            setPassword(user.password);
            setisEditOpen(true);
        } else if (action === "Deletar usuário") {
            setEmail(user.email);
            setIsDeleteModalOpen(true);
        }
    };
    const detail = async (email: string) => {
        const user = await findUser(email);
        setEmail(user.email);
        setName(user.name);
        setLevel(Number(user.level));
        setIsDetailModalOpen(true);
    }
    const userLevel = Number(localStorage.getItem("level"));
    return isAuthenticated ? (

        <>
            <Global
                styles={{
                    '::-webkit-scrollbar': {
                        width: '1px',
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: 'transparent',
                    },
                    '::-webkit-scrollbar-track': {
                        background: 'transparent',
                    }
                }}
            />
            <Flex>
                <Sidebar />
                <Box
                    flex="1"
                    bgColor="gray.300"
                    h="100vh"
                    overflow="hidden"
                >
                    <Flex
                        bgColor="white"
                        h="40rem"
                        overflowX="hidden"
                        w="70rem"
                        borderRadius="0.4rem"
                        align="center"
                        direction="column"
                        m="auto"
                        mt="2.5rem"
                    >
                        <Flex w="68rem" justify="space-between" m="1rem">
                            <Text fontSize="2rem" fontWeight="bold" color="black" textAlign="left">Usuários</Text>
                            {userLevel > 1 ? (
                                <Button
                                    bg="green.700"
                                    color="white"
                                    borderRadius="1rem"
                                    h="2rem"
                                    mt="0.5rem"
                                    _hover={{ bg: "green.600" }}
                                    onClick={() => {
                                        setisAditionOpen(true)
                                    }}
                                >
                                    Adicionar usuário
                                </Button>
                            ) : null}
                        </Flex>
                        {isAditionOpen && (
                            <Modal user={{ email: "", name: "", password: "", level: 1 }} id="" close={() => { setisAditionOpen(false) }} worked={() => { setisAditionOpen(false); reload() }} />
                        )}
                        {isEditOpen && (
                            <Modal user={{ email, name, password, level }} id={id} close={() => { setisEditOpen(false) }} worked={() => { setisEditOpen(false); reload() }} />
                        )}
                        {isDeleteModalOpen && (
                            <DeleteModal email={email} closeDelete={() => { setIsDeleteModalOpen(false) }} workedDelete={() => { setIsDeleteModalOpen(false); reload() }} />
                        )}
                        {isDetailModalOpen && (
                            <DetailModal
                                user={{ email, name, password, level }}
                                close={() => setIsDetailModalOpen(false)}
                            />
                        )}
                        <CustomTable editOrDelete={(action, email) => { editOrDelete(action, email) }} detail={(email) => { detail(email) }} users={users} />
                    </Flex>
                </Box>
            </Flex>
        </>
    ) : (
        <Flex>
            <p>Não autenticado!</p>
        </Flex>
    );
}

export default Usuarios;