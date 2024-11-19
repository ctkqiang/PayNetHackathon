import { FinancialAnalysis } from '../../src/controllers/financial_analysis';

describe('FinancialAnalysis', () => {
    describe('isInsuranceCoverageAdequate', () => {
        it('should return true if insurance sum assured is greater than or equal to 10 times the annual income', () => {
            const result = FinancialAnalysis.isInsuranceCoverageAdequate(50000, 500000);
            expect(result).toBe(true);
        });

        it('should return false if insurance sum assured is less than 10 times the annual income', () => {
            const result = FinancialAnalysis.isInsuranceCoverageAdequate(50000, 499999);
            expect(result).toBe(false);
        });

        it('should return true for zero annual income and non-zero insurance sum assured', () => {
            const result = FinancialAnalysis.isInsuranceCoverageAdequate(0, 1000);
            expect(result).toBe(true);
        });

        it('should return true for non-zero annual income and zero insurance sum assured', () => {
            const result = FinancialAnalysis.isInsuranceCoverageAdequate(50000, 0);
            expect(result).toBe(false);
        });
    });
});