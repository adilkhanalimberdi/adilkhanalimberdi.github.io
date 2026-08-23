import {useState} from "react";
import CustomToaster from "../../components/CustomToaster.tsx";
import {EyeSlashIcon} from "../../components/EyeSlashIcon.tsx";
import {EyeIcon, Loader2} from "lucide-react";
import ThemeSwitcher from "../../components/portfolio/ThemeSwitcher.tsx";
import {AdminService} from "../../services/portfolio/admin.service.ts";
import type {AdminLoginRequest} from "../../type/portfolio/auth.ts";
import toast from "react-hot-toast";
import type {ErrorResponse} from "../../type/error.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider.tsx";

function AdminLoginPage() {
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();

    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [sending, setSending] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password.trim()) return;

        setSending(true);

        const request: AdminLoginRequest = {
            password: password,
        }

        try {
            const authResponse = await AdminService.login(request);
            setAccessToken(authResponse.accessToken);
            navigate("/admin");

            toast.success("Welcome back!")
        } catch (err) {
            if (axios.isAxiosError<ErrorResponse>(err)) {
                const response = err.response?.data.message || "Invalid password or server error.";
                toast.error(response);
            }
            console.error(err);
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="min-h-dvh flex flex-col bg-primary text-text-primary font-sans transition-colors relative">
            <CustomToaster />

            {/* Переключатель темы в правом верхнем углу */}
            <div className="absolute top-6 right-6">
                <ThemeSwitcher />
            </div>

            <main className="flex-1 w-full mx-auto flex flex-col justify-center items-center py-10 px-6">
                <form onSubmit={handleLogin}
                      className="w-full max-w-md flex flex-col gap-6 p-8 bg-secondary border border-border rounded-xl shadow-lg">
                    <div className="w-full text-center space-y-1">
                        <h1 className="text-2xl font-semibold tracking-wide text-text-primary">
                            Admin Login
                        </h1>
                        <p className="text-sm text-text-muted">
                            Enter your security password to manage portfolio
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="admin-password" className="text-sm font-medium text-text-secondary">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input id="admin-password"
                                   name="password"
                                   type={showPassword ? "text" : "password"}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   autoComplete="current-password"
                                   className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-primary border border-border text-text-primary placeholder:text-text-muted text-sm transition-all focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-50"
                                   placeholder="••••••••"
                                   disabled={sending}
                                   required={true} />

                            <button type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 p-1.5 text-text-muted hover:text-text-primary hover:bg-hover rounded-md transition-colors cursor-pointer"
                                    title={showPassword ? "Hide password" : "Show password"}
                                    aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? (
                                    <EyeSlashIcon className="w-4 h-4" />
                                ) : (
                                    <EyeIcon className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit"
                            className="w-full h-11 mt-2 bg-button-primary hover:bg-button-primary-hover text-button-primary-text font-medium text-sm rounded-lg transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                            disabled={sending || !password.trim()}>
                        {sending ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default AdminLoginPage;