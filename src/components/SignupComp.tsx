import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IUser } from "../types/types";
interface SignInProps {
    onLoginClick: () => void;
    onSignupClick: (signupData: IUser) => void;
}

const SignupComponent = ({ onLoginClick, onSignupClick }: SignInProps) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSignupClick = () => {
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        } else {
            onSignupClick({ email:email, name:name, password:password, level:0 });
        }
    };
    return (
        <Flex
            bgColor="white"
            h="100vh"
            w="47rem"
            borderRadius="0.4rem"
            color="black"
            align="center"
            justify="center"
            direction="column"
        >
            <Heading fontSize="4rem">Cadastro</Heading>
            <Flex direction="column" w="29rem" gap="1rem" mt="3rem">
                <Text alignSelf="flex-start">Email</Text>
                <Input placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Text alignSelf="flex-start">Nome</Text>
                <Input placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                <Text alignSelf="flex-start">Senha</Text>
                <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Text alignSelf="flex-start">Confirme a senha</Text>
                <Input placeholder="Digite sua senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Flex>
            <Button _hover={{ cursor: "pointer" }} mt="1rem" bgColor="blue.400" onClick={handleSignupClick}>Cadastrar-se</Button>
            <Button _hover={{ cursor: "pointer" }} color="blue" textDecoration="underline" onClick={onLoginClick}>Fazer login?</Button>
        </Flex>
    );
}

export default SignupComponent;