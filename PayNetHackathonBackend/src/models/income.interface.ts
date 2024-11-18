import { IncomeType } from './income_type.enum';

export interface Income {
    id: number | null;
    income_type: IncomeType,
    amount: number;
}