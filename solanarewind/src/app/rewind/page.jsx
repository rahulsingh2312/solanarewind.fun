'use client'
import dynamic from "next/dynamic";

const RewindPage = dynamic(() => import("./Rewind"), { ssr: false });

export default function Page() {
  return <RewindPage />;
}
