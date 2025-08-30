import { ReactNode } from 'react';
import { GitClient } from '../../../core/src/index.ts';

interface SkelegitContextValue {
    clients: Record<string, GitClient>;
    defaultClient?: string;
    getClient: (name?: string) => GitClient | undefined;
}
export interface SkelegitProviderProps {
    children: ReactNode;
    clients: Record<string, GitClient>;
    defaultClient?: string;
}
export declare function SkelegitProvider({ children, clients, defaultClient }: SkelegitProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSkelegit(): SkelegitContextValue;
export {};
