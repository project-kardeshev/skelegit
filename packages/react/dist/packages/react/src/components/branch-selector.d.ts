export interface BranchSelectorProps {
    owner: string;
    repo: string;
    currentBranch?: string;
    clientName?: string;
    onBranchChange?: (branch: string) => void;
    className?: string;
}
export declare function BranchSelector({ owner, repo, currentBranch, clientName, onBranchChange, className, }: BranchSelectorProps): import("react/jsx-runtime").JSX.Element;
