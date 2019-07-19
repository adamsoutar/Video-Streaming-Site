cd src
mv config.js tmp.js
mv config.prod.js config.js
cd ../
npm run-script build
cd src
mv config.js config.prod.js
mv tmp.js config.js
