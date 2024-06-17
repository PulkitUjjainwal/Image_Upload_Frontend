// pages/change-email.js
import { useState } from "react";
import axios from "axios";
import Layout from "@/components/ui/Layout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ChangeEmail() {
  const [email, setEmail] = useState("");

  const handleUpdateEmail = async () => {
    try {
      const token = localStorage.getItem("token");
      const { userId } = jwt_decode(token);

      await axios.put(
        `https://image-upload-backend-ua0q.onrender.com/api/users/${userId}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Update email error:", error);
      alert("Email update failed.");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Change Email</h2>
        <Input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleUpdateEmail}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Email
        </Button>
      </div>
    </Layout>
  );
}
