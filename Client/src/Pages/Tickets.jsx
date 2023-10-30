import { AuthContex } from "../Components/Context/auth-context";
import { useEffect, useContext } from "react";

export default function Tickets() {
    const auth = useContext(AuthContex);
    useEffect(async () => {
        const requestData = {
            userId: auth.userId
        };

        await fetch("http://localhost:3000/api/ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

    }, [])
    return (
        <ul>
        </ul>
    )
}