import { AccountOverview } from './../models/account_overview.interface';

export class FinancialAnalysis {
    private account: AccountOverview;
    private persistency: string | number;

    /**
     * Constructor to initialize the FinancialAnalysis with an AccountOverview.
     * @param account - The account overview object containing user financial data.
     */
    public constructor(account: AccountOverview) {
        this.account = account;
        this.persistency = 0;  // initialize persistency as a default number
    }

    /**
     * Calculate the user's net worth based on their account overview.
     * @returns The net worth calculated as total assets minus total liabilities.
     */
    public get userNetWorth(): number {
        const totalAssets = this.account.total_current_account + this.account.total_saving_account + this.account.term_deposit;
        return totalAssets - this.userLiabilities;
    }

    /**
     * Calculate the user's liabilities based on their account overview.
     * @returns The total liabilities calculated from various accounts.
     */
    public get userLiabilities(): number {
        const totalCreditCardDebt = this.account.credit_card.total_credit_card_limit;
        const totalLoans = this.account.personal_loans.reduce((sum, loan) => sum + loan.loan_amount, 0);
        const totalMortgage = this.account.mortgage;

        return totalCreditCardDebt + totalLoans + totalMortgage;
    }

    /**
     * Calculate the user's cash flow based on income and liabilities.
     * @returns The cash flow based on income minus liabilities.
     */
    public get userCashflow(): number {
        const totalCashInFlow :number = this.account.income.amount;
        return totalCashInFlow - this.userLiabilities;
    }

    /**
     * Set the user's financial persistency ratio.
     * @returns The persistency ratio as a percentage.
     */
    public get userPersistency(): string | number {
        return this.persistency;
    }

    /**
     * Calculate the Debt Service Ratio (DSR) for the user.
     * This method should be implemented based on the financial formula.
     */
    private calculateDSR(): void {
        // Example formula: DebtServiceRatio = TotalDebt / TotalIncome
        const dsr = this.userLiabilities / this.account.income.amount;
        console.log('Debt Service Ratio:', dsr);
    }

    /**
     * Calculate the Wealth Accumulation Rate (WAR) for the user.
     * This method should be implemented based on the financial formula.
     */
    private calculateWAR(): void {
        // Example formula: WAR = (TotalAssets - TotalLiabilities) / TotalAssets
        const war = (this.userNetWorth / (this.userNetWorth + this.userLiabilities)) * 100;
        console.log('Wealth Accumulation Rate:', war);
    }

    /**
     * Calculate the user's current cash flow based on their current financial status.
     * This method can be expanded as needed.
     */
    private calculateCurrentCashFlow(): void {
        const currentCashFlow = this.userCashflow;
        console.log('Current Cash Flow:', currentCashFlow);
    }

    /**
     * Calculate the user's current net worth based on their financial data.
     * This method can be expanded to perform a more detailed calculation.
     */
    private calculateCurrentNetWorth(): void {
        const currentNetWorth = this.userNetWorth;
        console.log('Current Net Worth:', currentNetWorth);
    }

    /**
     * Calculate the persistency ratio based on user financial data and current spending.
     * @param currentSpending - The user's current spending amount.
     */
    private calculatePersistency(currentSpending: number): void {
        const totalAssets = this.userNetWorth + this.userCashflow;
        const totalDebts = this.userLiabilities + currentSpending;

        // Persistency ratio formula
        const persistencyRatio = totalAssets / totalDebts;
        this.persistency = (persistencyRatio * 100).toFixed(2);  // Convert to percentage
    }

    /**
     * Check if the user's persistency ratio is considered good.
     * @returns A message indicating whether the persistency is good.
     */
    private isPersistencyGood(): string {
        const persistencyValue = parseFloat(this.persistency.toString());

        if (persistencyValue > 100) {
            return 'Good Persistency: You have more assets than debts.';
        } else if (persistencyValue >= 75) {
            return 'Warning: Your persistency ratio is in a safe zone, but could be improved.';
        } else {
            return 'Poor Persistency: You may be over-leveraged.';
        }
    }
}
