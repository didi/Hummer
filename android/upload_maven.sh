#!/bin/bash

#定义颜色的变量
RED_COLOR="\033[1;31m"  #红
GREEN_COLOR="\033[1;32m" #绿
YELOW_COLOR="\033[1;33m" #黄
BLUE_COLOR="\033[1;34m"  #蓝
PINK="\033[1;35m"    #粉红
RES="\033[0m"

#./gradlew checkUploadConfig4Maven || ! echo -e  "${RED_COLOR}未通过打包的配置检测！！！ ${RES}" || exit

./gradlew clean
#./gradlew assembleRelease

./gradlew :hummer-core:assembleRelease --stacktrace
./gradlew :hummer-sdk:assembleRelease --stacktrace
./gradlew :hummer-component:assembleRelease --stacktrace
./gradlew :hummer:assembleRelease --stacktrace
./gradlew :hummer-dev-tools:assembleRelease --stacktrace

#publish

./gradlew :hummer-core:publishReleasePublicationToMavenCentralRepository
./gradlew :hummer-sdk:publishReleasePublicationToMavenCentralRepository
./gradlew :hummer-component:publishReleasePublicationToMavenCentralRepository
./gradlew :hummer:publishReleasePublicationToMavenCentralRepository
./gradlew :hummer-dev-tools:publishReleasePublicationToMavenCentralRepository


echo -e  "${GREEN_COLOR} 打包上传到MavenCenter()仓库完成！！！ ${RES}"
