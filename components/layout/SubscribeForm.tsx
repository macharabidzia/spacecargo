"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { subscribe } from "@/actions/common.actions";
import { useServerAction } from "@/hooks/useServerAction";

type SubscribeProps = {
  placeholder: string;
};

const Subscribe: React.FC<SubscribeProps> = ({ placeholder }) => {
  const { execute, isPending } = useServerAction(subscribe);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string
    await execute({ email: email });
    form.reset()
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto md:mx-0 space-x-2">
      <Input
        name="email"
        type="email"
        placeholder={placeholder}
        className="flex-1 rounded-lg h-auto dark:bg-gray-800 dark:text-gray-100"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="bg-space-blue-muted text-white rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700"
        aria-label="Subscribe"
      >
        <Send className="mr-1 h-4 w-4" />
      </Button>
    </form>
  );
};

export default Subscribe;
