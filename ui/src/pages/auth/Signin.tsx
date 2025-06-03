import { Button } from "@/components/ui/button";
import { FormEvent, ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export interface LoginTypes {
  username: string;
  password: string;
}
export function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginTypes>({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const queryClient = useQueryClient();
  const { mutate: signin } = useMutation({
    mutationFn: async (formData: LoginTypes) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.msg);
      } catch (error) {}
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/home");
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(formData);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to={"/register"}>
              <Button variant="link">Register?</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  placeholder="shadowfighter"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  ></a>
                </div>
                <Input
                  name="password"
                  onChange={handleChange}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col mt-6 gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
