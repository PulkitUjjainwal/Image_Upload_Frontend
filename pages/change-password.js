// pages/change-password.js
import { useState } from "react";
import axios from "axios";
import Layout from "@/components/ui/Layout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ChangePassword() {
  const [password, setPassword] = useState("");

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const { userId } = jwt_decode(token);

      await axios.put(
        `https://image-upload-backend-m1dw.onrender.com/api/users/${userId}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Update password error:", error);
      alert("Password update failed.");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleUpdatePassword}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Password
        </Button>
      </div>
    </Layout>
  );
}
