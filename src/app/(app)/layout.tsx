import { PrivateGuard } from "@/components/PrivateGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <PrivateGuard>{children}</PrivateGuard>;
}
