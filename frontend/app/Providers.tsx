"use client";

import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
      </Provider>
    </ClerkProvider>
  );
}
