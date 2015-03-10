#! /bin/bash

#webapp

pushd .
cd src/main/webapp
gulp clean build
popd


# scala

sbt clean assembly


# docker

docker build -t jwstegemann/durchstarter .
# docker push jwstegemann/durchstarter
