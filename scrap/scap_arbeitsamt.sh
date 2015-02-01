#! /bin/bash

id=0

rm dp_arbeitsagentur.csv

tail -n +2 test.csv | while read line; do
  
  (( id++ ))

  ort=`echo $line | sed "s/^\([^\^]*\).*/\1/"`

  plz=`echo $line | sed "s/^[0-9]*\^\([^\^]*\).*/\1/"`

  ~/downloads/phantomjs-1.9.8-linux-x86_64/bin/phantomjs phantom_arbeitsagentur.js $ort $plz $id #>> dp_arbeitsagentur.csv

done 