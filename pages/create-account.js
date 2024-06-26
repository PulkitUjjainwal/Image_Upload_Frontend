// pages/create-account.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/ui/Layout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://image-upload-backend-ua0q.onrender.com/api/auth/register",
        {
          email,
          password,
        }
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4"
          >
            Create Account
          </Button>
          <Link href="/login">
            <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
              Back to Login
            </Button>
          </Link>
        </form>
      </div>
    </Layout>
  );
}
