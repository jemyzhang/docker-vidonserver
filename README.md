DockerFile for vidon server x86
====
Binary files extracted from [docker hub](https://hub.docker.com/r/vidonmedev/vidonserver/).

## Start vidonserver

```
docker run -v /path/to/vidon/data/folder:/vidon -v /path/to/video:/media/video --network host -d --name="vidon" jemyzhang/vidonserver
```

## Existing problem
- SEGV after refresh media library sometimes.
- Lack of Blueray libraries, can not generate blueray navigate menu.
