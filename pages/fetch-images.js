import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
          `http://localhost:3003/api/images/images/${userId}`,
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
      <div className="flex flex-col gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-2">
              <img
                src={image.url}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Scheduled At:</span>{" "}
                  {new Date(image.scheduledAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  {image.published ? "Published" : "Scheduled"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => handleViewImage(image.url)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
            >
              View
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Link href="/upload-files">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Add More Images
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
