import 'package:flutter/material.dart';
import 'package:pfm_paynet/views/main_page.dart';
import 'package:pfm_paynet/views/setup_page.dart';
import 'package:pfm_paynet/views/splash_page.dart';

const appName = 'PFM'; // TODO change

Future<void> main() async {
  runApp(const PFM());
}

class PFM extends StatelessWidget {
  const PFM({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appName,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigoAccent),
        useMaterial3: true,
      ),
      initialRoute: '/splash',
      routes: {
        '/setup': (context) => const SetupPage(name: appName),
        '/splash': (context) => const SplashPage(name: appName),
        '/main': (context) => const MainPage(name: appName),
      },
    );
  }
}
