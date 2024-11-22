import 'package:flutter/material.dart';

class SetupPage extends StatefulWidget {
  final String? name;
  const SetupPage({super.key, this.name});

  @override
  State<SetupPage> createState() => _SetupPageState();
}

class _SetupPageState extends State<SetupPage>
    with SingleTickerProviderStateMixin {
  // List of options to display with checkboxes
  final List<String> options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ];

  // List to store whether each option is selected or not
  List<bool> _selectedOptions = [];
  AnimationController? _animationController;
  List<Animation<double>> _fadeAnimations = [];
  List<Animation<Offset>> _slideAnimations = [];

  @override
  void initState() {
    super.initState();

    // Initialize selected options
    _selectedOptions = List.generate(options.length, (index) => false);

    // Initialize animation controller
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    // Calculate the interval step to ensure we don't exceed 1.0
    final double intervalStep = 1.0 / options.length;

    // Create individual animations for each item
    _fadeAnimations = List.generate(
      options.length,
      (index) => Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(
        CurvedAnimation(
          parent: _animationController!,
          curve: Interval(
            index * intervalStep, // Start time proportional to list length
            (index * intervalStep) +
                intervalStep, // End time ensures we don't exceed 1.0
            curve: Curves.easeOut,
          ),
        ),
      ),
    );

    _slideAnimations = List.generate(
      options.length,
      (index) => Tween<Offset>(
        begin: const Offset(
            0.0, 0.3), // Reduced slide distance for smoother animation
        end: Offset.zero,
      ).animate(
        CurvedAnimation(
          parent: _animationController!,
          curve: Interval(
            index * intervalStep,
            (index * intervalStep) + intervalStep,
            curve: Curves.easeOut,
          ),
        ),
      ),
    );

    // Start the animation
    _animationController!.forward();
  }

  @override
  void dispose() {
    _animationController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_animationController == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Setup Page'),
      ),
      body: ListView.builder(
        itemCount: options.length,
        padding: const EdgeInsets.only(top: 8, bottom: 8),
        itemBuilder: (context, index) {
          return AnimatedBuilder(
            animation: _animationController!,
            builder: (context, child) {
              return Opacity(
                opacity: _fadeAnimations[index].value,
                child: SlideTransition(
                  position: _slideAnimations[index],
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      vertical: 4.0,
                      horizontal: 16.0,
                    ),
                    child: Card(
                      elevation: 2,
                      child: ListTile(
                        leading: Checkbox(
                          value: _selectedOptions[index],
                          onChanged: (bool? value) {
                            setState(() {
                              _selectedOptions[index] = value ?? false;
                            });
                          },
                        ),
                        title: Text(
                          options[index],
                          style: const TextStyle(fontSize: 16),
                        ),
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 16),
                      ),
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
