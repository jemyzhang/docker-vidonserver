FROM ubuntu:bionic
MAINTAINER Jemy Zhang <jemy.zhang@gmail.com>

ENV LANG zh_CN.UTF-8
ENV LANGUAGE zh_CN
ENV LC_CTYPE zh_CN.UTF-8
ENV TZ "Asia/Shanghai"
ENV VIDON_BIN_PATH "/vidonserver"
ENV VIDON_DATA_PATH "/vidon"
ENV VIDON_SYSTEM_LANG "Chinese (Simplified)"

RUN dpkg --add-architecture i386 \
    && apt-get update \
    && apt-get install -y locales tzdata \
    && locale-gen zh_CN.UTF-8 && update-locale \
    && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    && apt-get -y dist-upgrade \
    && apt-get install -y libc6:i386 zlib1g:i386 libstdc++6:i386 \
                          libglu1-mesa:i386 libglew1.6:i386 \
    && ln -sf /usr/lib/i386-linux-gnu/libGLEW.so.2.0.0 /usr/lib/i386-linux-gnu/libGLEW.so.1.6 \
    && apt-get -y clean

ADD vidonserver $VIDON_BIN_PATH

ENTRYPOINT ["/vidonserver/start.sh"]
