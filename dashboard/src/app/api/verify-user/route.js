import axios from "axios";
import { cookies } from "next/headers";
import { BASE_URL } from "../../../constants/constants";

export async function GET(request) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return new Response(JSON.stringify({ error: "No access token found" }), {
      status: 401,
    });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/users/verify-access-token`,
      access_token,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (response.status === 200) {
      return new Response(
        JSON.stringify({ message: "User authenticated", ...response.data }),
        { status: 200 },
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Authentication failed",
          status: response.status,
        }),
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
