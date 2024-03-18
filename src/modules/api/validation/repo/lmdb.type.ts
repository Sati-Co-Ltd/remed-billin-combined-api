export type ILmdbSct = {
    sctId: string;
    example: { sctId: string; value: string }[];
    evidence: string[];
    value: string;
};

export type ILmdbScore = {
    score?: number;
    label: boolean;
};
