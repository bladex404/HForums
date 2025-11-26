import { Button } from "@/components/ui/button";
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
import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState,} from "react";
import { ToastContainer,toast } from "react-toastify";
const signupfn= async(newUser: User) =>{
  const response = await fetch("http://localhost:3000/api/v1/users/register",
    {
      method: 'POST' ,
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newUser)
    }
  )
  if(!response.ok){
    throw new Error("Network response was not ok");
  }
  return response.json()

}
export function Signup() {

const queryClient = useQueryClient();
  const {mutate,isPending,isError,error,isSuccess } = useMutation({
    mutationFn: signupfn,
    onSuccess: () =>{
      queryClient.invalidateQueries(['user'])
    }
  })
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const handleSignUp = (e:any) =>{
      e.preventDefault();
      mutate({username, email, password});
  }
  if(isPending){
    toast.loading("Registering User")
  }
  if(isError){
    toast.error(`Registration failed! ${error}`)
  }
  if(isSuccess){
    toast.done("Registration Complete.Login now.")
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup to get Started.</CardTitle>
          <CardDescription>Enter Details to signup.</CardDescription>
          <CardAction>
            <Button variant="link">Sign in?</Button>x
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="shadowfighter"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="shadowfighter@gmail.com"
                  onChange={(e) =>setEmail(e.target.value)}
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
                <Input id="password" type="password" 

                  onChange={(e) =>setPassword(e.target.value)}
                required />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button type="submit" disabled={isPending} className="w-full">
              {isPending?"Signingup": "Signup"}
              </Button>

      <ToastContainer position="top-right" autoClose={2000}/>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
