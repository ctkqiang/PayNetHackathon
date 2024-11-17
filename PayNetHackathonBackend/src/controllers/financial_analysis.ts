import { AccountOverview } from './../models/account_overview.interface';

export class FinancialAnalysis {
    private static account: AccountOverview;
    private static persistency: number | string;

    /**
     * Constructor to initialize the FinancialAnalysis with an AccountOverview.
     * @param account - The account overview object containing user financial data.
     */
    public constructor(account: AccountOverview) {
        this.account = account;
    }

    /**
     * Calculate the user's net worth based on their account overview.
     * @returns The net worth calculated as total assets minus total liabilities.
     */
    public static get userNetWorth(): number | string {
        const totalAssets = this.account.current_account + this.account.savings_account + this.account.term_deposit;
        

        return totalAssets - totalLiabilities;
    }

    public static get userLiabilities(): number | string {
        const totalLiabilities = 
            this.account.credit_card.total_credit_card_limit +
            this.account.personal_loans.reduce((sum, loan) => sum + loan.loan_amount, 0) +
            this.account.mortgage;

        return totalLiabilities;
    }

    
    public static get userCashflow(): number | string {
        const totalCashInFlow = this.account.income - this.userLiabilities();
        
        return this.userNetWorth - totalCashInFlow;
    }

    public static set userPersistency() : number | string {
        return this.persistency;
    }

    private static calculateDSR() : void {}
    
    private static calculateWAR() : void {}    

    private static calculateCurrentCashFlow() : void {}

    private static calculateCurrentNetWorth() : void {}

    private static calculatePersistency(current_spending: number) : void  {
        const totalAssets = this.userCashflow + this.userNetWorth;
        const totalDebts = this.userLiabilities + current_spending;

        const pr = totalAssets / totalDebts;

        this.persistency = `${pr}%`;
    }

    private static isPersistencyGood(percentage): string {}
}