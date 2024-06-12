import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/ui/Layout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://image-upload-backend-m1dw.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      router.push("/upload-files");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </Layout>
  );
}
