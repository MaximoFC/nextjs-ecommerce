import { useEffect, useState } from 'react';

export default function useCurrentUser() {
    const [user, setUser] = useState<null | { role: string, email: string }>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include'
                });
                if (!res.ok) {
                    setUser(null);
                } else {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}