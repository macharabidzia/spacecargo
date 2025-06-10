'use client';
import React, { useEffect, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getQueryClient } from '@/lib/queryClient';
import { store } from '@/store';

// Define a key for local storage (can be in a constants file)
const LOCAL_STORAGE_THEME_KEY = 'app-theme';

// Inner component to use Redux hooks and manage theme side effects

export function GlobalProviders({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                    {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
}
