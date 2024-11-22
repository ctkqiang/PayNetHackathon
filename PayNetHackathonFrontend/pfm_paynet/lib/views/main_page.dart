import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  final String? name;

  const MainPage({super.key, this.name});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(),
    );
  }
}
