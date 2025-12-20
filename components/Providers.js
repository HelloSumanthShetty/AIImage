'use client';

// import { UserProvider } from '@/context/UserContext';
import { CreditsProvider } from '@/context/CreditsContext';

export function Providers({ children }) {
    return (
        <CreditsProvider>
            {/* Future Stripe Provider will be wrapped here */}
            {/* <StripeProvider> */}
            {children}
            {/* </StripeProvider> */}
        </CreditsProvider>
    );
}
