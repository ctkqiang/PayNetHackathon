run_server:
	-  cd PayNetHackathonBackend && npm run dev

run_app:
	- cd PayNetHackathonFrontend && flutter run
	
build_server:
	- cd PayNetHackathonBackend && docker-compose up --build