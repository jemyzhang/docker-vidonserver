#!/bin/sh

export LD_LIBRARY_PATH=$VIDON_BIN_PATH/libs:$VIDON_BIN_PATH/libs/system:$LD_LIBRARY_PATH

export VIDON_BIN_HOME=$VIDON_BIN_PATH
export VIDON_HOME=$VIDON_BIN_PATH
export VIDON_LINUX_LIBS=$VIDON_BIN_PATH/libs
export VIDON_PROFILE=$VIDON_DATA_PATH/profile
export VIDON_USERDATA=$VIDON_DATA_PATH/userdata
export VIDON_TEMP=$VIDON_DATA_PATH/temp

trap _exit INT TERM

_exit() {
  FORCE_EXIT=1
  pkill -TERM -f "$VIDON_BIN_PATH/vidonserver" || true
}

FORCE_EXIT=0

while true; do
  $VIDON_BIN_PATH/vidonserver &
  while pgrep -f "$VIDON_BIN_PATH/vidonserver" > /dev/null; do
    sleep 1
  done
  # server exit unexpected or killed
  if [ $FORCE_EXIT -eq 1 ]; then
    echo "force exit"
    break;
  fi
done

