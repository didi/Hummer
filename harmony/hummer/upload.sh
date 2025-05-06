#!/bin/bash

# Author: jiayinqi
# Version: 1.1.0
# Date: 2024-1-10
# Desc: publish Har script

#ohpm config set key_path /Users/didi/Login/publishKey
#ohpm config set publish_id 4883C7C7A1
#ohpm publish ./static_demo_second_api10/build/default/outputs/default/static_demo_second_api10.har --publish_registry http://harmonyos.intra.xiaojukeji.com/repos/ohpm

curr_dir="$PWD"
username=$(whoami)

echo "user: $username"

RED='\033[0;31m'
NC='\033[0m'

publish_didi_ohpm="http://harmonyos.intra.xiaojukeji.com/repos/ohpm"

cache_dir='../.hvigor/next-cache'
publish_key_dir="$HOME/.ssh_ohpm"
npmrc_file_path="/Users/$username/.npmrc"
publish_key_path="$publish_key_dir/publish_key"
publish_key_content="-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,C93F6CB89A46E28573B14A75C306AD4A

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
-----END RSA PRIVATE KEY-----"


json_util_script_content="
const JSON5 = require('json5');
const fs = require('fs');

const help_info = '解析json5: 请至少输入两个参数 [file_path] [要解析的key] [...]'

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Error: ' + help_info);
    return;
}

const path = args[0];

let jsonData = '';
fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
        console.log('Error: reading file: ' + err);
        return;
    }
    jsonData = data;

    if (jsonData === '') {
        console.log('Error: data is empty')
        return;
    }
    const restArgs = args.slice(1);

    let d = JSON5.parse(jsonData);

    let result = d;
    for (const arg of restArgs) {
        if (result && typeof result === 'object' && arg in result) {
            result = result[arg];
        } else {
            result = 'Error: Invalid argument or key not found';
            break;
        }
    }

    console.log(result);
});
"

json_util_script_path='../.hvigor/next-cache/json5-util.js'
json5_path='../.hvigor/next-cache/node_modules/json5'

if [ ! -d "$cache_dir" ]; then
    mkdir "$cache_dir"
fi

if [ ! -e "$json_util_script_path" ]; then
    touch "$json_util_script_path"
    echo "$json_util_script_content" > "$json_util_script_path"
    echo ">create json util done."
fi

if [ ! -d "$publish_key_dir" ]; then
    mkdir "$publish_key_dir"
fi

if [ ! -e "$publish_key_path" ]; then
    touch "$publish_key_path"
    echo "$publish_key_content" > "$publish_key_path"
    echo ">create publish key on > $publish_key_path done."
fi

if [ ! -e "$npmrc_file_path" ]; then
    touch "$npmrc_file_path"
    echo ">create .npmrc on > $npmrc_file_path done."
fi

ignore_file_path="$curr_dir/.ohpmignore"
ignore_content="upload.properties
upload.sh
"

if [ ! -e "$ignore_file_path" ]; then
    touch "$ignore_file_path"
    echo "$ignore_content" > "$ignore_file_path"
    echo ">create .ohpmignore done."
else
    if ! grep -q "upload.properties" "$ignore_file_path"; then
      echo "upload.properties" >> "$ignore_file_path"
      echo "> .ohpmignore 添加: upload.properties"
    fi
    if ! grep -q "upload.sh" "$ignore_file_path"; then
      echo "upload.sh" >> "$ignore_file_path"
      echo "> .ohpmignore 添加: upload.sh"
    fi
fi

if [ ! -d "$json5_path" ]; then
  cd $cache_dir
  npm install json5
  cd $curr_dir
fi

wait
if [ ! -d "$json5_path" ]; then
  echo -e "${RED} json5安装失败: 请查看文档: https://cooper.didichuxing.com/docs2/document/2201448585735 常见错误. ${NC}"
  exit 1
fi


function starts_with_error {
  local string_to_check="$1"
  local prefix="Error"

  if [[ $string_to_check == $prefix* ]]; then
    return 0
  else
    return 1
  fi
}


ohpm config set key_path $publish_key_path
echo '> set key_path done.'
ohpm config set publish_id 4883C7C7A1
echo '> set publish_id done.'


properties_file='./upload.properties'
target_key='target'
target_value='default'
auto_build='true'

auto_build_key='autoBuild'

if [ -f "$properties_file" ]; then
    while IFS='=' read -r key value; do
        key=$(echo "$key" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        value=$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        echo "$key=$value"

        if [ "$key" = "target" ]; then
            target_value="$value"
        fi
        if [ "$key" = "autoBuild" ]; then
            auto_build="$value"
        fi
    done < <(grep -v '^[[:space:]]*\(#\|$\)' "$properties_file")
else
    target_value='default'
fi

lib_module_json5_file="./src/main/module.json5"
target_har_path=""
module_name=""

if [ -e "$lib_module_json5_file" ]; then

    result=$(node $json_util_script_path $lib_module_json5_file 'module' 'name')

    if starts_with_error "$result"; then
      echo -e "${RED}解析 $lib_module_json5_file 失败: 请联系jiayinqi${NC}"
      exit 1
    fi

#    json_data=$(cat "$lib_module_json5_file")
#    name=$(echo "$json_data" | grep -o '"name":[^,}]*' | awk -F: '{print $2}' | tr -d '"')
#    name=$(echo "$name" | awk '{$1=$1};1')
#    if [[ $name == *$'\n'* ]]; then
#          modified_string=$(echo "$name" | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n.*//')
#      else
#          modified_string=$name
#    fi
#    module_name=$modified_string
    module_name=$result
    target_har_path="build/$target_value/outputs/$target_value/$module_name.har"
else
    echo -e "${RED}module.json5 not exist!${NC}"
    exit 1
fi

echo "参数: target: [$target_value] , module name: [$module_name] , auto build: [$auto_build]"

if [ "$auto_build" = "true" ]; then
  echo "> start build..."

  script_path="../hvigorw"

  if [ ! -x "$script_path" ]; then
      # Make the script executable
      chmod +x "$script_path"
      echo "> script set executable."
  else
      echo ""
  fi


  build_cmd=" --mode module -p product=$target_value -p module=$module_name@$target_value assembleHar --analyze=normal --parallel --incremental --daemon"
  echo "> hvigorw $build_cmd"
  cd ..
  output=$(hvigorw --mode module -p product=$target_value -p module=$module_name@$target_value assembleHar --analyze=normal --parallel --incremental --daemon)
  exit_status=$?
  echo "--> $output"
  if [ $exit_status -eq 0 ]; then
    substring="BUILD SUCCESSFUL"
    if [[ $output == *"$substring"* ]]; then
      echo "> build done."
    else
      echo -e "${RED}构建失败:${NC} $output"
      echo -e "${RED}如果自动构建失败,可以手动构建后再发布. 将upload.properties 的autoBuild设为false关闭发布自动构建!${NC}"
      exit 1
    fi
  else

    echo -e "${RED}构建失败: status= $exit_status${NC}"
    echo -e "${RED}如果自动构建失败,可以手动构建后再发布. 将upload.properties 的autoBuild设为false关闭发布自动构建!${NC}"
    exit 1
  fi
  cd $curr_dir
else
  echo 'autoBuild已关闭，用户自己构建'
fi

target_har_path=$PWD/$target_har_path
echo "target har: $target_har_path"

if [ ! -e "$target_har_path" ]; then
  echo -e "${RED}target har not exist in $target_har_path. 未构建 or 构建失败请检查。${NC}"
  exit 1
fi

lib_package_json5_file="./oh-package.json5"
if [ -e "$lib_package_json5_file" ]; then
#    json_data=$(cat "$lib_package_json5_file")
#    name=$(echo "$json_data" | grep -o '"name":[^,}]*' | awk -F: '{print $2}' | tr -d '"')
#    name=$(echo "$name" | awk '{$1=$1};1')
#    if [[ $name == *$'\n'* ]]; then
#        modified_string=$(echo "$name" | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n.*//')
#    else
#        modified_string=$name
#    fi

    name_result=$(node $json_util_script_path $lib_package_json5_file 'name')

    if starts_with_error "$name_result"; then
      echo -e "${RED}解析 $lib_module_json5_file 失败: 请联系jiayinqi${NC}"
      exit 1
    fi

    if echo "$name_result" | grep -q "@didi-"; then
        echo ''
    else
        echo -e "${RED}upload name:$name_result 不合法. 规范: @didi-[业务线] ex: @didi-wyc. 请修改: on-package.json5${NC}"
        exit 1
    fi
else
    echo -e "${RED}$lib_package_json5_file not exist!${NC}"
    exit 1
fi


ohpm publish $target_har_path --publish_registry $publish_didi_ohpm






