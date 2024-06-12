// pages/user-profile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "@/components/ui/Layout";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const userResponse = await axios.get(
          `http://localhost:3003/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userResponse.data);

        const imagesResponse = await axios.get(
          `http://localhost:3003/api/images/images/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageCount(imagesResponse.data.images.length);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Uploaded Images:</strong> {imageCount}
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/change-email">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Change Email
                </Button>
              </Link>
              <Link href="/change-password">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
