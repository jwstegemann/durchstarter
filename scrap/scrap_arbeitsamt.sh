#! /bin/bash

id=0

outfile=$1.json

rm $outfile

echo "[" > $outfile

cat $1 | while read line; do
  
  (( id++ ))

  ort=`echo $line | sed "s/^\([^\^]*\).*/\1/"`

  plz=`echo $line | sed "s/^[0-9]*\^\([^\^]*\).*/\1/"`

  echo {\"ort\":\"$ort\", \"plz\":\"$plz\"}, >> $outfile


done 

echo "]" >> $outfile