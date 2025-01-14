import toast from "react-hot-toast";
import axios from "axios";
import { IUser } from "../types/types";
async function getUsers() {
    const response = await axios.get(
        "http://localhost:3000/user",
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
    );
    const users = response.data;
    const finalUsers = users.map((user: IUser) => {
        return { name: user.name, email: user.email, level: user.level };
    });
    return finalUsers;
}
async function findUser(email: string) {
    try {
        const response = await axios.get(
            `http://localhost:3000/user/email/${email}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );
        if (response.data && response.data.length !== 0) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}
async function verificaUsuario(user: IUser) {
    const response = await axios.post(
        'http://localhost:3000/auth/login',
        {
            email: user.email,
            password: user.password
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
    );
    if (response.data) {
        return response.data;
    }
    return { message: "error" };
}
async function logout() {
    const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
            withCredentials: true
        }
    );
    if (response.data) {
        console.log(response.data);
        return response.data;
    }
    return { message: "error" };
}
async function createUser(user: IUser) {
    const existe = await findUser(user.email);
    if (existe !== null) {
        toast.error("Usuário com esse email já existe");
        return false;
    }

    const finalUser = { email: user.email, name: user.name, password: user.password };
    try {
        const response = await axios.post("http://localhost:3000/user/signup", finalUser, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        if (response.data) {
            toast.success("Usuário cadastrado com sucesso");
            return true;
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toast.error("Erro ao cadastrar usuário");
    }

    return false;
}
async function updateUser(user: IUser, id: string) {
    try {
        const response1 = await axios.get(`http://localhost:3000/user/id/${id}`, { withCredentials: true });
        const usuarioAtual = response1.data;

        if (usuarioAtual.email === user.email) {
            console.log("aqui")
            const finalUser = { email: user.email, name: user.name, password: user.password, level: user.level };
            const updateResponse = await axios.put(`http://localhost:3000/user/id/${id}`, finalUser, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            if (updateResponse.data) {
                toast.success("Usuário atualizado com sucesso");
                return true;
            }
        } else {
            const existe = await findUser(user.email);
            if (existe !== null) {
                toast.error("Usuário com esse email já existe");
                return false;
            }

            const finalUser = { email: user.email, name: user.name, password: user.password, level: user.level };
            const updateResponse = await axios.put(`http://localhost:3000/user/id/${id}`, finalUser, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            if (updateResponse.data) {
                toast.success("Usuário atualizado com sucesso");
                return true;
            }
        }
    } catch (error) {
        console.log("Erro ao atualizar usuário:", error);
        toast.error("Erro ao atualizar usuário");
        return false;
    }
    return false;
}
async function createUserLoggedIn(user: IUser) {
    const existe = await findUser(user.email);
    if (existe !== null) {
        toast.error("Usuário com esse email já existe");
        return false;
    }

    const finalUser = {
        email: user.email,
        name: user.name,
        password: user.password,
        level: user.level,
    };

    try {
        const response = await axios.post("http://localhost:3000/user/create", finalUser, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        if (response.data) {
            toast.success("Usuário cadastrado com sucesso");
            return true;
        }
    } catch (error) {
        console.log("Erro ao cadastrar usuário:", error);
        toast.error("Erro ao cadastrar usuário");
    }

    return false;
}
async function deleteUser(email: string) {
    const email1 = localStorage.getItem("email");

    if (email1 === email) {
        toast.error("Você não pode deletar o próprio usuário");
        return false;
    }

    const user = await findUser(email);

    if (user) {
        try {
            const response = await axios.delete(`http://localhost:3000/user/${user.id}`, { withCredentials: true });

            if (response.status === 200) {
                toast.success("Usuário deletado com sucesso");
                return true;
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            toast.error("Erro ao deletar usuário");
        }
    }
    return false;
}
async function decodeToken() {
    const token = await axios.get(
        "http://localhost:3000/auth/profile",
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
    )
    return token.data;
}
export { findUser, verificaUsuario, createUser, getUsers, updateUser, createUserLoggedIn, deleteUser, decodeToken, logout };

