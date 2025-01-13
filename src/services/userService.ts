import toast from "react-hot-toast";
import { IUser } from "../types/types";

async function findUser(email: string) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const user = await response.json();
    if (user.length !== 0) {
        return user;
    }
    return null;
}
async function verificaUsuario(user: IUser) {
    const response = await fetch(`http://localhost:3000/users?email=${user.email}`);
    const usuario = await response.json();
    if (usuario.length !== 0) {
        if (usuario[0].password !== user.password) {
            return null;
        }
        return usuario;
    }
    return null;
}
async function createUser(user: IUser) {
    const existe = await findUser(user.email);
    if (existe !== null) {
        toast.error("Usuário com esse email já existe");
        return false;
    }
    const finalUser = { email: user.email, name: user.name, password: user.password, level: 1, code: 0, isValid: false };
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalUser),
    });
    const newUser = await response.json();
    if (newUser) {
        toast.success("Usuário cadastrado com sucesso");
        return true;
    }
    toast.error("Erro ao cadastrar usuário");
    return false;
}
async function getUsers() {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const finalUsers = users.map((user: IUser) => {
        return { name: user.name, email: user.email, level: user.level };
    });
    return finalUsers;
}
async function updateUser(user: IUser, id: string) {
    const response1 = await fetch(`http://localhost:3000/users/${id}`);
    const usuarioAtual = await response1.json();
    if (usuarioAtual.email === user.email) {
        const finalUser = { email: user.email, name: user.name, password: user.password, level: user.level, code: 0, isValid: false };
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalUser),
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            toast.success("Usuário atualizado com sucesso");
            return true;
        }
        return false;
    } else {
        const existe = await findUser(user.email);
        if (existe !== null) {
            toast.error("Usuário com esse email já existe");
            return false;
        }
        const finalUser = { email: user.email, name: user.name, password: user.password, level: user.level, code: 0, isValid: false };
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalUser),
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            toast.success("Usuário atualizado com sucesso");
            return true;
        }
        return false;
    }
}
async function createUserLoggedIn(user: IUser) {
    const existe = await findUser(user.email);
    if (existe !== null) {
        toast.error("Usuário com esse email já existe");
        return false;
    }
    const finalUser = { email: user.email, name: user.name, password: user.password, level: user.level, code: 0, isValid: false };
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalUser),
    });
    const newUser = await response.json();
    if (newUser) {
        toast.success("Usuário cadastrado com sucesso");
        return true;
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
        const response = await fetch(`http://localhost:3000/users/${user[0].id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            toast.success("Usuário deletado com sucesso");
            return true;
        }
    }
    return false;
}
export { findUser, verificaUsuario, createUser, getUsers, updateUser, createUserLoggedIn, deleteUser };