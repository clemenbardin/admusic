import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

export default function AdminPage () {
    const { data: session, status } = useSession()
    // const router = useRouter()

    if (status === "loading") {
        return <div>Loading ...</div>
    }

    // if (!session || session.user.role !== 'admin') {
        // router.push('/dashboard');
        // return null;
    // }

    return (
        <div>
            <h1>Alertes</h1>
        </div>
    )
}