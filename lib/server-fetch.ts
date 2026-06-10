// import { getNewAccessToken } from "@/services/auth/auth.service";

import { getCookie } from "@/app/services/auth/tokenHandler";

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
  const { headers, ...rest } = options;
  const accessToken = await getCookie("authToken");

  // if(endpoint !== "/auth/refresh-token"){
  //   await getNewAccessToken()
  // }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken?.value && {
        authorization: `Bearer ${accessToken.value}`,
      }),
      ...headers,
    },
  });

  return response;
};

export const serverFetch = {
  get: (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
