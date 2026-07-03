import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import { signup } from "../../api/api";
import { USER_AUTH_KEY } from "../queries/queryoptions";
import type { UserAuthSchemaType } from "../../schemas/schemas";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: UserAuthSchemaType) => {
      await login(data);
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
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: UserAuthSchemaType) => {
      const response = await signup(data);
      setAuth(response.user, response.accessToken);
      return response;
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
