import { useRouter } from "next/navigation";

function UsersPage(){
    const router = useRouter();
    return (
        <button onClick={() => router.push('/users/1')}>
            Go to user 1
        </button>
    )
}

export default UsersPage;