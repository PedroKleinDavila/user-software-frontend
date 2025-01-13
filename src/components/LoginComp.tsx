import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IUser } from "../types/types";

interface LoginComponentProps {
    onLoginClick: (loginData: IUser) => void;
    onSignupClick: () => void;
}

const LoginComponent = ({ onLoginClick, onSignupClick }: LoginComponentProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLoginClick = () => {
        onLoginClick({ name:"",email:email,level:0, password:password });
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
            <Heading fontSize="4rem">Bem Vindo</Heading>
            <Flex direction="column" w="29rem" gap="1rem" mt="3rem">
                <Text alignSelf="flex-start">Email</Text>
                <Input placeholder="Digite seu login" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Text alignSelf="flex-start">Senha</Text>
                <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Flex>
            <Button _hover={{cursor:"pointer"}} mt="1rem" bgColor="blue.400" onClick={handleLoginClick}>Login</Button>
            <Button _hover={{cursor:"pointer"}} color="blue" textDecoration="underline" onClick={onSignupClick}>Fazer cadastro?</Button>
        </Flex>
    );
}

export default LoginComponent;