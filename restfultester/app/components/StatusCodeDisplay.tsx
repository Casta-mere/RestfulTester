// components/StatusCodeDisplay.tsx
interface Props {
  status: number;
}

const statusMessages: Record<number, string> = {
  200: "Success",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
};

export default function StatusCodeDisplay({ status }: Props) {
  const isSuccess = status >= 200 && status < 300;
  const message = statusMessages[status] || "Unknown Status";

  return (
    <div
      className={`font-bold mb-2 ${
        isSuccess ? "text-green-600" : "text-red-600"
      }`}
    >
      {status} - {message}
    </div>
  );
}
