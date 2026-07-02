import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "./queryoptions";

export function useProfile() {
  return useQuery(profileQueryOptions());
}
