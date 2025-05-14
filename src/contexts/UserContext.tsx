'use client';

import { createContext, useContext, useEffect, useState } from "react"; 

interface User {
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true
});

export function UserProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include'
                });

                if (res.status === 401) {
                    setUser(null);
                } else if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    throw new Error('Error getting user');
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}