import { useContext } from 'react';
import { useCreditsContext } from '@/context/CreditsContext';

export function useCredits() {
    const context = useCreditsContext();

    if (context === undefined || context === null) {
        throw new Error('useCredits must be used within a CreditsProvider');
    }

    return context;
}
