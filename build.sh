#! /bin/bash

#webapp

#pushd .
#cd src/main/webapp
#gulp build
#popd


# scala

sbt clean assembly


# docker

docker build -t jwstegemann/durchstarter .
docker push jwstegemann/durchstarter