import 'package:pfm_paynet/models/fin_category.enum.dart';

class Calculate {
  Calculate._();

  Calculate.create() : this._();

  double getCasflow({double? totalInflow, double? totalOutflow}) {
    return totalInflow! + totalOutflow!;
  }

  double getDSR({double? totalDebtsPayments, double? monthlyIncome}) {
    return (totalDebtsPayments! / monthlyIncome!);
  }

  double getNetworth({double? totalAssets, double? totalLiabilities}) {
    return totalAssets! - totalLiabilities!;
  }

  Map<String, FinancialCategory> getFinCat() {
    final List<String> options = [
      'Expenses',
      'Income',
      'Debts',
      'Cashflow',
      'Net Worth',
      'Persistency Ratio',
      'Wealth Accumulation Ratio',
      'Emergency Funds',
      'Insurances',
      'Investments'
    ];

    Map<String, FinancialCategory> financialCategories = {};

    for (var option in options) {
      switch (option) {
        case 'Investments':
        case 'Net Worth':
        case 'Emergency Funds':
        case 'Insurances':
        case 'Cashflow':
          financialCategories[option] = FinancialCategory.assets;
          break;
        default:
          financialCategories[option] = FinancialCategory.liabilities;
          break;
      }
    }

    return financialCategories;
  }

  String evaluateDSR(double dsr) {
    switch (dsr) {
      case double n when (n < 30):
        return 'Healthy, low risk, strong financial position (Good)';
      case double n when (n >= 30 && n <= 40):
        return 'Manageable, generally acceptable (Neutral/Acceptable)';
      case double n when (n > 40 && n <= 50):
        return 'Higher debt load, increased financial strain (Risky/Bad)';
      default:
        return 'Financially overburdened, high risk (Very Bad)';
    }
  }
}
