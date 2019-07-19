cd atlanta-server
docker build -t atlanta-server .
docker run altanta-server -p 3001:3001 -d
cd ../atlanta-upload
docker build -t atlanta-uploader .
docker run atlanta-uploader -p 3002:3002 -d
