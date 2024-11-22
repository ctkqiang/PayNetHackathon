class User {
  final int? id;
  final String name;
  final String email;
  final String password;
  final DateTime? createdAt;

  User({
    this.id,
    required this.name,
    required this.email,
    required this.password,
    this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'ID': id,
      'NAME': name,
      'EMAIL': email,
      'PASSWORD': password,
      'CREATEDAT': createdAt?.toIso8601String(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['ID'] as int?,
      name: map['NAME'] as String,
      email: map['EMAIL'] as String,
      password: map['PASSWORD'] as String,
      createdAt: map['CREATEDAT'] != null
          ? DateTime.parse(map['CREATEDAT'] as String)
          : null,
    );
  }

  @override
  String toString() {
    return 'User{id: $id, name: $name, email: $email, createdAt: $createdAt}';
  }
}
