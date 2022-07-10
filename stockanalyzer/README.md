# stockanalyzer

Copyright (C) 2016-2022 Ryan Trade International RTI


create directory gitanalyzer and clone all project into this directory  script depend on it. 


Initial Setup
clone the following java repos
toasthub-core
toasthub-member
toasthub-security
toasthub-admin
toasthub-system
toasthub-stock
stockanalyzer

clone db scripts
toasthub-db

run pull command to get all git submodules
place at src/main/js
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-core.git core
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-reactweb-core.git coreView
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-admin.git admin
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-reactweb-admin.git adminView
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-system.git system
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-reactweb-system.git systemView

cd to src/main/js/member
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-member-session.git session
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-member-profile.git profile
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-reactweb-member-profile.git profile
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-react-member-logout.git logout
git submodule add -b feature/Ed_1_on_develop https://github.com/seufster71/toasthub-reactweb-member-logout.git logout


run npm install

start server

run web npm start