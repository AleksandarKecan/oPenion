import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

function Register({ onClose }) {
    const { login } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username, email: data.email, password: data.password,
                }),
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
        }
    };
    
    return (
        <>
            <div className="register-backdrop" onClick={ onClose }></div>
            <div className="register-overlay">
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", { required: "Username is required" })} />
                    {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}    

                <label htmlFor="email">E-mail Address</label>
                    <input type="email" id="email" {...register("email", { required: "Email is required"})} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>} 

                <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register("password", { required: "password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>} 

                <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })} />
                    {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                
                <button type="submit">Create Account</button>
                <button type="button" onClick={ onClose }>X</button>

            </form>
            </div>
        </>
    );
}

export default Register;