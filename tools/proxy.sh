wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy
sudo mkdir -p /cloudsql
sudo chmod 777 /cloudsql
./cloud_sql_proxy -dir=/cloudsql &
