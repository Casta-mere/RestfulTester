import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = "http://10.136.48.97/func/web_main/api";
const AUTH = {
  username: "admin",
  password: "admin_default",
};
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json(
      { error: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const targetUrl = `${BASE_URL}/${path}`;

    const response = await axios.get(targetUrl, {
      auth: AUTH,
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
  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json(
      { error: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const response = await axios.post(`${BASE_URL}/${path}`, body, {
      auth: AUTH,
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
  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json(
      { error: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const response = await axios.put(`${BASE_URL}/${path}`, body, {
      auth: AUTH,
      headers: HEADERS,
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, data: error.response?.data || null },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json(
      { error: "Missing 'path' parameter" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const response = await axios.delete(`${BASE_URL}/${path}`, {
      auth: AUTH,
      headers: HEADERS,
      data: body,
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
