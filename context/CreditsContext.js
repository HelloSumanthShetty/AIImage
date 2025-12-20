'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from '@/lib/auth-client';

const CreditsContext = createContext(null);

export function CreditsProvider({ children }) {
    const { data: session } = useSession();
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCredits = useCallback(async () => {
        if (!session?.user) {
            setCredits(null);
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/credits');
            if (res.ok) {
                const data = await res.json();
                setCredits(data.credits);
            }
        } catch (error) {
            console.error('Failed to fetch credits', error);
        } finally {
            setLoading(false);
        }
    }, [session?.user]);

    // Initial fetch when session changes
    useEffect(() => {
        if (session?.user) {
            fetchCredits();
        }
    }, [fetchCredits, session?.user]);

    // Update state immediately if we know the new value
    const updateCredits = (newCount) => {
        setCredits(newCount);
    };

    return (
        <CreditsContext.Provider value={{
            credits: credits ?? session?.user?.credits ?? 0,
            loading,
            refreshCredits: fetchCredits,
            updateCredits
        }}>
            {children}
        </CreditsContext.Provider>
    );
}

// Internal hook to access context - can export this or keep consuming in useCredits
export function useCreditsContext() {
    return useContext(CreditsContext);
}
