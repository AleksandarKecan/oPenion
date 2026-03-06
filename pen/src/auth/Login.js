import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function Login({ onClose }) {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            if (response.ok) {
                login(responseData.user);
                onClose();
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error while connecting with server");
        } finally {
        }
    };

    return (
        <>
        <div className="login-backdrop" onClick={ onClose }></div>
        <div className="login-overlay">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p style={{ color:"red"}}>{errors.email.message}</p>}

                <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" name="pwd" {...register("password", {required: "Password is required"})} />
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                <button type="submit">Log In</button>
                <button type="button" onClick={onClose}>X</button>
            </form>
            </div>
        </>
    );
}

export default Login;