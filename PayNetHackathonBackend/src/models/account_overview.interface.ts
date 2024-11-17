import { Income } from './income.interface';
import { PersonalLoans } from './personal_loans.interface';
import { CreditCard } from './credit_cards.interface';

export interface AccountOverview {
    id: number;
    total_current_account: number;
    total_saving_account: number;
    term_deposit: number;
    money_market: number;
    credit_card: CreditCard;
    personal_loans: PersonalLoans[];
    mortgage: number;
    income: Income;
}
