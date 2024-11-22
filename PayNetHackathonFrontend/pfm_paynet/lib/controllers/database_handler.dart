import 'package:get_storage/get_storage.dart';
import 'package:logger/logger.dart';
import 'package:pfm_paynet/models/user.model.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseHandler {
  // Private constructor for singleton pattern
  DatabaseHandler._();
  DatabaseHandler.create() : this._();

  // Logger instance for logging messages
  final logger = Logger();

  final localStorage = GetStorage();

  // Database name
  final databaseName = 'pfm.db';

  // Private static variable for holding the database instance
  static Database? _database;

  // Database getter to return the database instance
  Future<Database> get database async {
    if (_database != null) return _database!;

    _database =
        await _initDatabase(); // Initialize the database if it isn't already
    return _database!;
  }

  // Initializes the database, opening it from the default path
  Future<Database> _initDatabase() async {
    final databasePath = await getDatabasesPath();
    final path = '$databasePath/$databaseName';

    // Open the database, creating it if necessary
    return await openDatabase(path, version: 1, onCreate: _createDatabase);
  }

  // Creates tables in the database if they don't already exist
  Future<void> _createDatabase(Database db, int version) async {
    try {
      await db.execute('''
      -- Create USERS table
      CREATE TABLE IF NOT EXISTS USERS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        EMAIL TEXT NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL,
        CREATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create CATEGORIES table
      CREATE TABLE IF NOT EXISTS CATEGORIES (
        CATEGORY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        CATEGORY_NAME TEXT NOT NULL
      );

      -- Create ACCOUNTS table
      CREATE TABLE IF NOT EXISTS ACCOUNTS (
        ACCOUNT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USER_ID INTEGER NOT NULL,
        ACCOUNT_NAME TEXT NOT NULL,
        ACCOUNT_TYPE TEXT NOT NULL,
        BALANCE REAL NOT NULL DEFAULT 0.0,
        CREATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE
      );

      -- Create EXPENSES table
      CREATE TABLE IF NOT EXISTS EXPENSES (
        EXPENSE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        ACCOUNT_ID INTEGER NOT NULL,
        CATEGORY_ID INTEGER NOT NULL,
        AMOUNT REAL NOT NULL,
        DESCRIPTION TEXT,
        TRANSACTION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CREATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATEDAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ACCOUNT_ID) REFERENCES ACCOUNTS(ACCOUNT_ID) ON DELETE CASCADE,
        FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID)
      );
    ''');

      logger.d('Tables created successfully.');
    } catch (e) {
      logger.e('Error creating tables: $e');
      rethrow;
    }
  }

  // Inserts a new user into the USERS table
  Future<void> insertUser(Database db, {User? user}) async {
    try {
      // Insert the user data into the USERS table, replacing any conflicts
      await db.insert(
        'USERS',
        user!.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    } catch (e) {
      logger.e('Error inserting user: $e');
    } finally {
      logger.i('Inserting user: ${user?.toMap()}');
    }
  }

  // Retrieves all users from the USERS table
  Future<List<User>> getUsers(Database db) async {
    try {
      // Query all users from the USERS table
      final List<Map<String, dynamic>> maps = await db.query('USERS');
      // Map the result into a list of User objects
      return maps.map((map) => User.fromMap(map)).toList();
    } catch (e) {
      logger.e('Error getting users: $e');
      return List<User>.empty();
    } finally {
      logger.i('getUsers finished');
    }
  }

  // Inserts a predefined list of categories into the CATEGORIES table
  Future<void> writeIntoCategory(Database db) async {
    final categories = [
      'Groceries',
      'Rental',
      'Housing',
      'Transportation',
      'Utilities',
      'Food',
      'Entertainment',
      'Healthcare',
      'Savings',
      'Insurance',
      'Education',
      'Debt Repayment',
      'Miscellaneous'
    ];

    try {
      // Loop through the list of categories and insert each one into the CATEGORIES table
      for (String category in categories) {
        await db.insert(
          'CATEGORIES',
          {'CATEGORY_NAME': category},
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
      }
      logger.d('Categories inserted successfully.');
    } catch (e) {
      logger.e('Error inserting categories: $e');
    }
  }

  // Inserts a predefined set of mock transactions into the EXPENSES table
  Future<void> writeMockTransactions(Database db) async {
    final mockTransactions = [
      {
        'ACCOUNT_ID': 1,
        'CATEGORY_ID': 1,
        'AMOUNT': 100.50,
        'DESCRIPTION': 'Weekly grocery shopping',
        'TRANSACTION_DATE': DateTime.now().toString(),
      },
      {
        'ACCOUNT_ID': 1,
        'CATEGORY_ID': 2,
        'AMOUNT': 1200.00,
        'DESCRIPTION': 'Monthly rent payment',
        'TRANSACTION_DATE': DateTime.now().toString(),
      },
      {
        'ACCOUNT_ID': 2,
        'CATEGORY_ID': 3,
        'AMOUNT': 300.00,
        'DESCRIPTION': 'Electricity bill',
        'TRANSACTION_DATE': DateTime.now().toString(),
      },
      {
        'ACCOUNT_ID': 3,
        'CATEGORY_ID': 4,
        'AMOUNT': 50.75,
        'DESCRIPTION': 'Fuel for car',
        'TRANSACTION_DATE': DateTime.now().toString(),
      },
      {
        'ACCOUNT_ID': 1,
        'CATEGORY_ID': 5,
        'AMOUNT': 40.00,
        'DESCRIPTION': 'Dinner at restaurant',
        'TRANSACTION_DATE': DateTime.now().toString(),
      }
    ];

    try {
      // Loop through the list of mock transactions and insert each one into the EXPENSES table
      for (var transaction in mockTransactions) {
        await db.insert(
          'EXPENSES',
          transaction,
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
      }
      logger.d('Mock transactions inserted successfully.');
    } catch (e) {
      logger.e('Error inserting mock transactions: $e');
    }
  }

  // Insert a single transaction into the EXPENSES table
  Future<void> insertTransaction(
    Database db, {
    required int accountId,
    required int categoryId,
    required double amount,
    String? description,
  }) async {
    try {
      final transactionData = {
        'ACCOUNT_ID': accountId,
        'CATEGORY_ID': categoryId,
        'AMOUNT': amount,
        'DESCRIPTION': description ?? '',
        'TRANSACTION_DATE': DateTime.now().toString(),
      };

      await db.insert(
        'EXPENSES',
        transactionData,
        conflictAlgorithm: ConflictAlgorithm.replace,
      );

      logger.d('Transaction inserted successfully: $transactionData');
    } catch (e) {
      logger.e('Error inserting transaction: $e');
    }
  }

  void saveLocal(String baseKey, int index, String item) {
    localStorage.write('$baseKey$index', item);
  }

  String? readLocal(String baseKey, int index) {
    return localStorage.read('$baseKey$index');
  }

  void saveChoices(String baseKey, List<String> items) {
    for (int i = 0; i < items.length; i++) {
      saveLocal(baseKey, i, items[i]);
    }
  }
}
