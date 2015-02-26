#! /bin/bash

sudo grep -v "\^\^\^\^" ../export/dp_Kunde.csv > ../export/dp_Kunde_gefiltert.csv

../elasticsearch/init $1

node index_orte.js $1

# per ort
node index_per_ort.js $1 ../export/dp_finanzamt.csv fa_
node index_per_ort.js $1 ../export/dp_gemeindeverwaltung.csv gem_
node index_per_ort.js $1 ../export/dp_hwk.csv hwk_
node index_per_ort.js $1 ../export/dp_ihk.csv ihk_
node index_per_ort.js $1 ../export/dp_wifoe_lk.csv wif_
node index_per_ort.js $1 ../export/dp_aa.csv aa_

# per gemeinde
node index_per_gemeinde.js $1 ../export/dp_beteiligungsgesellschaft.csv bg_
node index_per_gemeinde.js $1 ../export/dp_buergschaftsbank.csv bsb_
node index_per_gemeinde.js $1 ../export/dp_foerderbank_land.csv fbl_
node index_per_gemeinde.js $1 ../export/dp_foerderbank_bund.csv fbb_
node index_per_gemeinde.js $1 ../export/dp_Kunde_gefiltert.csv kd_

