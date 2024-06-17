// pages/fetch-images.js
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode
import Layout from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function FetchImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const { data } = await axios.get(
          `https://image-upload-backend-ua0q.onrender.com/api/images/images/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(data.images);
      } catch (error) {
        console.error("Fetch images error:", error);
      }
    };

    fetchImages();
  }, []);

  const handleViewImage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Your Uploaded Images
        </h2>
        <ul className="space-y-4">
          {images.map((image) => (
            <li
              key={image.id}
              className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4"
            >
              <img
                src={image.url}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Scheduled At:</span>{" "}
                  {new Date(image.scheduledAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  {image.published ? "Published" : "Scheduled"}
                </p>
              </div>
              <Button
                onClick={() => handleViewImage(image.url)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
              >
                View Image
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between">
          <Link href="/upload-files">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Upload More Images
            </Button>
          </Link>
          <Link href="/user-profile">
            <Button className="bg-gray-500 hover:bg-gray-600 text-white">
              Back to Profile
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
