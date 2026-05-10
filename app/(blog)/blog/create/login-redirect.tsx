"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";

export default function LoginRedirect() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/blog");
  };

  return (
    <div className="min-h-screen bg-background">
      <LoginModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
