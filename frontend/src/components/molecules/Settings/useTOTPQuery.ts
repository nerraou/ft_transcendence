import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

interface UseTOTPQueryParams {
  jwt: string | unknown;
}

interface UseTOTPQueryResponse {
  secret: string;
  keyuri: string;
}

export default function useTOTPQuery(params: UseTOTPQueryParams) {
  return useSuspenseQuery<UseTOTPQueryResponse>({
    queryKey: ["/otp"],
    async queryFn() {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/totp/secret";

      const response = await baseQuery(url, {
        headers: {
          Authorization: `Bearer ${params.jwt}`,
        },
      });

      return await response.json();
    },
  });
}
