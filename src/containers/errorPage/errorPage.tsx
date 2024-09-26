import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // Type guard to check if error is an instance of Error
  if (error instanceof Error) {
    console.error(error);
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  }

  // Fallback for unknown error types
  console.error("Unknown error:", error);
  return (
    <div id="error-page" className="flex flex-col items-center ">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>An unknown error occurred.</i>
      </p>
    </div>
  );
}
