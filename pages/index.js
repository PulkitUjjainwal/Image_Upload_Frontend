import Link from "next/link";
import Layout from "@/components/ui/Layout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <Layout>
      <Card className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
          Welcome to the Image Upload Platform
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Get started by creating an account or logging in.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/create-account">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Create Account
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </Layout>
  );
}
