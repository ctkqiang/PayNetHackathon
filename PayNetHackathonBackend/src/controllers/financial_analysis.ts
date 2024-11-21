import { AccountOverview } from './../models/account_overview.interface';
import { TaxBracket } from './../models/tax_brackets.interface';

export class FinancialAnalysis {
    private account: AccountOverview;
    private persistency: number;

    // Malaysian tax brackets for income tax calculation
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
     * Initialize the FinancialAnalysis instance with an account overview.
     * @param account - User's financial account overview.
     */
    public constructor(account: AccountOverview) {
        this.account = account;
        this.persistency = 0; // Initialize persistency as 0
    }

    // Derived Properties:

    /**
     * Total net worth = Total assets - Total liabilities.
     */
    public get userNetWorth(): number {
        return this.totalAssets - this.userLiabilities;
    }

    /**
     * Total liabilities = Credit card debt + Loans + Mortgage.
     */
    public get userLiabilities(): number {
        const creditCardDebt = this.account.credit_card.total_credit_card_limit;
        const loans = this.account.personal_loans.reduce((sum, loan) => sum + loan.loan_amount, 0);
        const mortgage = this.account.mortgage;

        return creditCardDebt + loans + mortgage;
    }

    /**
     * Total assets = Current account + Savings account + Term deposit.
     */
    private get totalAssets(): number {
        return this.account.total_current_account + this.account.total_saving_account + this.account.term_deposit;
    }

    /**
     * Cashflow = Total income - Liabilities.
     */
    public get userCashflow(): number {
        return this.account.income.amount - this.userLiabilities;
    }

    /**
     * Persistency ratio as a percentage.
     */
    public get userPersistency(): number {
        return this.persistency;
    }

    // Financial Calculations:

    /**
     * Calculate the Debt Service Ratio (DSR).
     * DSR = Total liabilities / Total income
     */
    public calculateDSR(): number {
        if (this.account.income.amount === 0) {
            throw new Error('Income cannot be zero for DSR calculation.');
        }
        return this.userLiabilities / this.account.income.amount;
    }

    /**
     * Calculate the Wealth Accumulation Rate (WAR).
     * WAR = Net worth / (Net worth + Liabilities)
     */
    public calculateWAR(): number {
        const totalWealth = this.userNetWorth + this.userLiabilities;
        return totalWealth ? (this.userNetWorth / totalWealth) * 100 : 0; // Avoid division by zero
    }

    /**
     * Calculate the persistency ratio based on user financial data and current spending.
     * @param currentSpending - The user's current spending.
     */
    public calculatePersistency(currentSpending: number): number {
        const totalDebt = this.userLiabilities + currentSpending;
        if (totalDebt === 0) {
            throw new Error('Total debt cannot be zero for persistency calculation.');
        }

        const totalAssets = this.userNetWorth + this.userCashflow;
        this.persistency = (totalAssets / totalDebt) * 100; // Persistency as a percentage
        return this.persistency;
    }

    /**
     * Check if the persistency ratio indicates financial health.
     */
    public isPersistencyGood(): string {
        if (this.persistency > 100) {
            return 'Good Persistency: You have more assets than debts.';
        } else if (this.persistency >= 75) {
            return 'Warning: Your persistency is in a safe zone but could improve.';
        } else {
            return 'Poor Persistency: You may be over-leveraged.';
        }
    }

    /**
     * Calculate Malaysian income tax based on income, reliefs, and rebates.
     */
    public static calculateMalaysianTax(income: number, reliefs: number = 0, rebates: number = 0): number {
        const chargeableIncome = Math.max(0, income - reliefs);
        let tax = 0;

        for (const bracket of this.TAX_BRACKETS) {
            if (chargeableIncome > bracket.min) {
                const taxableAmount = Math.min(chargeableIncome, bracket.max) - bracket.min;
                tax += taxableAmount * bracket.rate;
            }
        }

        return Math.max(0, tax - rebates); // Tax payable cannot be negative
    }

    /**
     * Check if insurance coverage is sufficient (>=10x annual income).
     */
    public static isInsuranceCoverageAdequate(annualIncome: number, insuranceSumAssured: number): boolean {
        return insuranceSumAssured >= annualIncome * 10;
    }
}
