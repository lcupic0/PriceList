"use client"; // client component for skeleton + delay

import { useEffect, useState } from "react";

export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300); // minimal delay before showing loader
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "40px",
      backgroundColor: "#3A3A2B"
    }}>
      <h2 style={{color: "#fff", fontSize: "1.5rem"}}>Učitavanje artikala...</h2>
      
      {/* Skeleton list */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton-item"></div>
      ))}

      <style jsx>{`
        .skeleton-item {
          height: 50px;
          width: 100%;
          max-width: 500px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.2) 37%,
            rgba(255, 255, 255, 0.1) 63%
          );
          background-size: 400% 100%;
          border-radius: 8px;
          animation: shimmer 1.4s ease infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
      `}</style>
    </div>
  );
}
