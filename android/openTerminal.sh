pwd
ps |grep "startServer" |grep -v grep
if [ $? -ne 0 ]
then
open -a Terminal "../startServer.sh"
fi