'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('mock_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = () => {
        // Mock User Data
        const newUser = {
            id: 'mock_uid_123',
            name: 'Demo User',
            email: 'demo@gmail.com',
            credits: 2, // Free credits on signup
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'
        };

        // Check if we have an "existing" demo user to persist credits mostly for demo feel
        const storedUser = localStorage.getItem('mock_user');
        if (storedUser) {
            // If logging in again, restore their state
            setUser(JSON.parse(storedUser));
        } else {
            // First time login
            setUser(newUser);
            localStorage.setItem('mock_user', JSON.stringify(newUser));
        }
    };

    const logout = () => {
        setUser(null);
        // We typically don't clear localStorage in a demo so their credits persist if they "log back in",
        // but for a true "logout" feel let's clear it or just state. 
        // Let's keep it in storage to simulate a Database persistence.
        // localStorage.removeItem('mock_user'); 
    };

    const deductCredit = () => {
        if (!user) return false;
        if (user.credits <= 0) return false;

        const updatedUser = { ...user, credits: user.credits - 1 };
        setUser(updatedUser);
        localStorage.setItem('mock_user', JSON.stringify(updatedUser));
        return true;
    };

    const addCredits = (amount) => {
        if (!user) return;
        const updatedUser = { ...user, credits: user.credits + amount };
        setUser(updatedUser);
        localStorage.setItem('mock_user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, deductCredit, addCredits }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
