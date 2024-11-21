import 'package:flutter/material.dart';
import 'package:pfm_paynet/views/splash_page.dart';

Future<void> main() async {
  runApp(const MyApp());
}

class PFM extends StatelessWidget {
  const PFM({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PFM',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigoAccent),
        useMaterial3: true,
      ),
      home: const SplashPage(),
    );
  }
}

