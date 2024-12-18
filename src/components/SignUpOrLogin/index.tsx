import React, { useState } from "react";
import axios from "axios";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false); // Controle de modo (Login/Signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Se for modo de cadastro, verificar se as senhas coincidem
    if (!isLoginMode && password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      if (isLoginMode) {
        // Enviar a requisição de login para o back-end
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        setSuccessMessage("Login bem-sucedido!");
        console.log(response.data); // Token JWT ou outras informações podem ser retornadas
      } else {
        // Enviar a requisição de signup para o back-end
        await axios.post("http://localhost:5000/api/auth/signup", {
          email,
          password,
        });

        // Exibir mensagem de sucesso após o cadastro
        setSuccessMessage("Cadastro bem-sucedido! Você pode fazer login.");
      }

      // Limpar campos e mensagens após sucesso
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
    } catch {
      setError("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLoginMode ? "Login" : "Cadastro"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            {isLoginMode ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLoginMode((prevMode) => !prevMode)}
            className="text-blue-600 hover:underline"
          >
            {isLoginMode ? "Ainda não tem uma conta? Cadastre-se." : "Já tem uma conta? Faça login."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
