import 'package:pfm_paynet/models/fin_category.enum.dart';

class Calculate {
  Calculate._();

  Calculate.create() : this._();

  int getCasflow() {
    return 0;
  }

  int getNetworth() {
    return 0;
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
}
