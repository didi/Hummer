echo "######## start hummer local server ########"

work_path=$(dirname $0)
server_dir=$work_path/../test/hummer

if [[ ! -d "$server_dir" ]]; then
  server_dir=$work_path/hummer-test
fi

cd $server_dir
hummer dev
