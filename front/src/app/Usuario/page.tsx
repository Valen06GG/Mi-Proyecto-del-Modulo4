'use client'

import { useAuth } from "../context/authContext"

function UserPage() {
    const { dataUser } = useAuth();

    return (
        <div>
            <div>
                <p>Nombre:</p>
                <p>{dataUser?.user.name}</p>
            </div>

            <div>
                <p>Email:</p>
                <p>{dataUser?.user.email}</p>
            </div>
        </div>
    )
}

export default UserPage;