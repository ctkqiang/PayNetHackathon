import 'package:pfm_paynet/models/user.model.dart';

class Authentication {
  Authentication._();
  Authentication.create() : this._();

  Future<bool> login({User? user}) async {
    return true;
  }

  Future<bool> register({User? user}) async {
    return true;
  }

  Future<void> signOut() async {
    return;
  }
}
