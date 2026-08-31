"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            background: "#f4efe3",
            color: "#1e1f1c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "520px",
              borderRadius: "24px",
              background: "#fffaf0",
              border: "1px solid rgba(30, 31, 28, 0.12)",
              padding: "28px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6f716b",
              }}
            >
              UMURANGA
            </p>

            <h1
              style={{
                margin: "12px 0 0",
                fontSize: "34px",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              Something went wrong.
            </h1>

            <p
              style={{
                margin: "16px 0 0",
                color: "#6f716b",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              The page could not load correctly. Try again.
            </p>

            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "22px",
                border: 0,
                borderRadius: "999px",
                background: "#1e1f1c",
                color: "#f4efe3",
                padding: "12px 18px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}