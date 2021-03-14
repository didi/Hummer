echo "######## start hummer local server ########"

work_path=$(dirname $0)
server_dir=$work_path/../examples/hummer
cd $server_dir
hummer dev
