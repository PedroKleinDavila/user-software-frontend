import { Flex, Box, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { createUserLoggedIn, updateUser } from "../services/userService";
import { IUser } from "../types/types";
interface ModalProps {
    user: IUser;
    id: string;
    close: (value: boolean) => void;
    worked: (value: boolean) => void;
}
const Modal = ({ user, id, close, worked }: ModalProps) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        level: yup.number().required().min(1).max(Number(localStorage.getItem("level"))),
        password: yup.string(),
    });
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState(user.level);
    const yupValidate = async () => {
        try {
            await schema.validate({ email, name, level, password }, { abortEarly: false });
            return true;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err) => {
                    toast.error(err.message);
                });
            } else {
                toast.error("Erro desconhecido");
            }
            return false;
        }
    }
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
                    Adicionar Novo Usuário
                </Text>
                <Input placeholder="Nome" mb="1rem" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Email" mb="1rem" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Nível de Acesso" mb="1rem" value={level} onChange={(e) => setLevel(Number(e.target.value))} />
                <Input placeholder="Senha" mb="1rem" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Flex justify="flex-end">
                    <Button
                        mr="0.5rem"
                        onClick={() => {close(true)}}
                    >
                        Cancelar
                    </Button>
                    <Button
                        bg="green.700"
                        color="white"
                        _hover={{ bg: "green.600" }}
                        onClick={async () => {
                            if (await yupValidate()) {
                                let success;
                                if (id === "") {
                                    success = await createUserLoggedIn({ email, name, level, password });
                                } else {
                                    success = await updateUser({ email, name, level, password }, id);
                                }
                                if (success) {
                                    worked(true);
                                }
                            }
                        }}
                    >
                        Salvar
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Modal;