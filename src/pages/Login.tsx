import { Flex } from "@chakra-ui/react";
import LoginComponent from "../components/LoginComp";
import SignupComponent from "../components/SignupComp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import toast from "react-hot-toast";
import { verificaUsuario, createUser, teste } from "../services/userService";
import { IUser } from "../types/types";

const Login = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().required(),
    });
    const navigate = useNavigate();

    const handleLoginClick = async (loginData: IUser) => {
        const user = await verificaUsuario(loginData);
        if (user.level) {
            localStorage.setItem("user", user.level);
            localStorage.setItem("email", user.email);
            navigate("/usuarios");
        } else {
            toast.error("Usuário ou senha inválidos");
        }
    };

    const handleSignupClick = async (signupData: IUser) => {
        try {
            await schema.validate(signupData, { abortEarly: false });
            const success = await createUser(signupData);
            if (success) {
                handleChangeTabLogin();
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err) => {
                    toast.error(err.message);
                });
            } else {
                toast.error("Erro desconhecido");
            }
        }
    };

    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const handleChangeTabSignup = () => {
        teste()
        setIsLoginVisible(false);
    };

    const handleChangeTabLogin = () => {
        teste()
        setIsLoginVisible(true);
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            backgroundImage="url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F2ZSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            {isLoginVisible ? (
                <Flex className="login" ml="auto">
                    <LoginComponent
                        onLoginClick={handleLoginClick}
                        onSignupClick={handleChangeTabSignup}
                    />
                </Flex>
            ) : (
                <Flex className="signup" ml="auto">
                    <SignupComponent
                        onLoginClick={handleChangeTabLogin}
                        onSignupClick={handleSignupClick}
                    />
                </Flex>
            )}
        </Flex>
    );
}

export default Login;