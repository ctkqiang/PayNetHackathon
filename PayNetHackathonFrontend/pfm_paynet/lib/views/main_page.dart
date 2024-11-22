import 'package:flutter/material.dart';
import 'package:pfm_paynet/controllers/database_handler.dart';

class MainPage extends StatefulWidget {
  final String? name;

  const MainPage({super.key, this.name});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final databaseHandler = DatabaseHandler.create();

  late List<String> choices = [];

  @override
  void initState() {
    super.initState();
    super.setState(() {
      choices = databaseHandler.localStorage.read('choices');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Text(choices.toString()),
      ),
    );
  }
}
