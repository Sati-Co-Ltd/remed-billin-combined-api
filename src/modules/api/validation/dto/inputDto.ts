export type inputReMED = {
    product: {
        sctId: string; // code of medicine, product
        value?: string;
    }[];
    diagnosis: {
        // Accept both diagnosis and procedure code
        sctId: string; // code of diagnosis and procedure
        value?: string;
    }[];
};
