import { PersonalLoans } from './personal_loans.interface';
import { CreditCard } from './credit_cards.interface';

export interface AccountOverview {
    id: number;
    current_account: string[];
    saving_account: string[];
    term_deposit: string;
    money_market: string;
    credit_card: CreditCard;
    personal_loans: PersonalLoans[];
}
