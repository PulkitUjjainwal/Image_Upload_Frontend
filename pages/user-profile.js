// pages/user-profile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode
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
          `https://image-upload-backend-ua0q.onrender.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userResponse.data);

        const imagesResponse = await axios.get(
          `https://image-upload-backend-ua0q.onrender.com/api/images/images/${userId}`,
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
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        {user && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              User Profile
            </h2>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Uploaded Images:</strong> {imageCount}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
              <Link href="/change-email">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Change Email
                </Button>
              </Link>
              <Link href="/change-password">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Change Password
                </Button>
              </Link>
              <Link href="/upload-files">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Upload Images
                </Button>
              </Link>
              <Link href="/fetch-images">
                <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
                  View Uploaded Images
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
