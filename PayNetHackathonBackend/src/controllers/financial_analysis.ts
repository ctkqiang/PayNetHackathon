import { AccountOverview } from './../models/account_overview.interface';
import { TaxBrackets } from './../models/tax_brackets.interface';

export class FinancialAnalysis {
    private account: AccountOverview;
    private persistency: string | number;
    private static readonly TAX_BRACKETS: TaxBracket[] = [
        { min: 0, max: 5000, rate: 0 },
        { min: 5001, max: 20000, rate: 0.01 },
        { min: 20001, max: 35000, rate: 0.03 },
        { min: 35001, max: 50000, rate: 0.08 },
        { min: 50001, max: 70000, rate: 0.13 },
        { min: 70001, max: 100000, rate: 0.21 },
        { min: 100001, max: 250000, rate: 0.24 },
        { min: 250001, max: 400000, rate: 0.25 },
        { min: 400001, max: 600000, rate: 0.26 },
        { min: 600001, max: 1000000, rate: 0.28 },
        { min: 1000001, max: 2000000, rate: 0.30 },
        { min: 2000001, max: Infinity, rate: 0.32 },
    ];

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

    /**
     * Calculates Malaysian income tax based on the given income, reliefs, and rebates.
     *
     * @param income - The gross annual income of the individual.
     * @param reliefs - Total amount of applicable reliefs (e.g., EPF, personal relief).
     * @param rebates - Total amount of applicable rebates (e.g., zakat, tax rebates).
     * @returns The total income tax payable after applying reliefs and rebates.
     */
    private static calculateMalaysianTax(income: number, reliefs: number = 0, rebates: number = 0): number {
        // Calculate chargeable income by deducting reliefs from gross income.
        // Ensure chargeable income is not negative by using Math.max.
        const chargeableIncome = Math.max(0, income - reliefs);
        let tax = 0; // Initialize the tax payable to zero.

        // Iterate through each tax bracket to calculate the tax.
        for (const bracket of TAX_BRACKETS) {
            // Check if the chargeable income exceeds the lower limit of the tax bracket.
            if (chargeableIncome > bracket.min) {
                // Determine the taxable amount for the current bracket.
                const taxableAmount = Math.min(chargeableIncome, bracket.max) - bracket.min;

                // Calculate the tax for the current bracket and add it to the total tax.
                tax += taxableAmount * bracket.rate;
            }
        }

        // Subtract applicable rebates from the total tax.
        // Ensure the final tax payable is not negative by using Math.max.
        return Math.max(0, tax - rebates);
    }
}
