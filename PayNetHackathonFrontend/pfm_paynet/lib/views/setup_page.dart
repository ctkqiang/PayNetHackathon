import 'package:flutter/material.dart';

class SetupPage extends StatefulWidget {
  final String? name;
  const SetupPage({super.key, this.name});

  @override
  State<SetupPage> createState() => _SetupPageState();
}

class _SetupPageState extends State<SetupPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text("setup"),
    );
  }
}
