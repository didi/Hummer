echo "------>> start <<------"
ps |grep "Script/start" |grep -v grep
if [ $? -ne 0 ]
then
open -a Terminal "../Script/start"
fi
