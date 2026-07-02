import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { login, signup } from "../../api/api";
import { USER_AUTH_KEY } from "../queries/queryoptions";
import type { UserAuthSchemaType } from "../../schemas/schemas";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserAuthSchemaType) => {
      return login(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_AUTH_KEY] });
      toast.success("Welcome back!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserAuthSchemaType) => {
      return signup(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_AUTH_KEY] });
      toast.success("Account created!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
