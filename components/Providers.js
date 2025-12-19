'use client';

import { UserProvider } from '@/context/UserContext';

export function Providers({ children }) {
    return (
        <UserProvider>
            {/* Future Stripe Provider will be wrapped here */}
            {/* <StripeProvider> */}
            {children}
            {/* </StripeProvider> */}
        </UserProvider>
    );
}
