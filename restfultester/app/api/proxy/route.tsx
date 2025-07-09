import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function parseProxyRequest(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  if (!path) {
    return {
      errorResponse: NextResponse.json(
        { error: "Missing 'path' parameter" },
        { status: 400 }
      ),
    };
  }

  const baseUrl = req.headers.get("x-base-url");
  const authHeader = req.headers.get("authorization");

  let auth: { username: string; password: string } | undefined = undefined;
  if (authHeader?.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(authHeader.slice(6), "base64").toString(
        "utf-8"
      );
      const [username, password] = decoded.split(":");
      auth = { username, password };
    } catch (e) {
      return {
        errorResponse: NextResponse.json(
          { error: "Invalid Authorization header" },
          { status: 400 }
        ),
      };
    }
  }

  if (!baseUrl || !auth) {
    return {
      errorResponse: NextResponse.json(
        { error: "Missing baseUrl or auth info" },
        { status: 400 }
      ),
    };
  }

  const targetUrl = `${baseUrl.replace(/\/$/, "")}/${path}`;

  return { targetUrl, auth };
}
export async function GET(req: NextRequest) {
  const { targetUrl, auth, errorResponse } = parseProxyRequest(req);
  if (errorResponse) return errorResponse;

  try {
    const response = await axios.get(targetUrl, {
      auth,
      headers: HEADERS,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, data: error.response?.data || null },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { targetUrl, auth, errorResponse } = parseProxyRequest(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const response = await axios.post(targetUrl, body, {
      auth,
      headers: HEADERS,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, data: error.response?.data || null },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { targetUrl, auth, errorResponse } = parseProxyRequest(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const response = await axios.put(targetUrl, body, {
      auth,
      headers: HEADERS,
    });

    return response.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, data: error.response?.data || null },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { targetUrl, auth, errorResponse } = parseProxyRequest(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const response = await axios.delete(targetUrl, {
      auth,
      headers: HEADERS,
      data: body,
    });

    return response.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return error.response
      ? NextResponse.json(error.response.data, {
          status: error.response.status,
        })
      : NextResponse.json({ error: error.message }, { status: 500 });
  }
}
