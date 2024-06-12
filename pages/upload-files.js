import { useState } from "react";
import axios from "axios";
import Layout from "@/components/ui/Layout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function UploadFiles() {
  const [image, setImage] = useState(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("scheduledAt", scheduledAt);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3003/api/images/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully!");
      router.push("/fetch-images");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <Layout>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Image</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4"
        />
        <Input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          placeholder="Schedule Publish Date"
          className="w-full mb-4"
        />
        <Button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4"
        >
          Upload
        </Button>
        <Button
          onClick={() => router.push("/fetch-images")}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white"
        >
          View Uploaded Images
        </Button>
      </div>
    </Layout>
  );
}
