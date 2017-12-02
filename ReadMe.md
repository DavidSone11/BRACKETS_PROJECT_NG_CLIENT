


# MONGOLAB
* BRACKETS_PROJECT_NG_CLIENT
* 172.21.0.0/16
* url : mongodb://<dbuser>:<dbpassword>@ds125716.mlab.com:25716/locolink
* >mongo ds125716.mlab.com:25716/locolink -u db_locolink -p root123
* username : db_locolink
* password : root123
# MLAB INSTALLATION

Database: locolink


* To connect using the mongo shell:
* mongo ds125716.mlab.com:25716/locolink -u <dbuser> -p <dbpassword>
* To connect using a driver via the standard MongoDB URI (what's this?):

* mongodb://<dbuser>:<dbpassword>@ds125716.mlab.com:25716/locolink
* mongodb://db_locolink:root123@ds125716.mlab.com:25716/locolink
* mongod version: 3.4.9 (MMAPv1)
#### MLAB IMPORT/EXPORT



###Import database

* mongorestore -h ds125716.mlab.com:25716 -d locolink -u <user> -p <password> <input db directory>

* Export database

* mongodump -h ds125716.mlab.com:25716 -d locolink -u <user> -p <password> -o <output directory>

* Import collection

* mongorestore -h ds125716.mlab.com:25716 -d locolink -u <user> -p <password> <input .bson file>

* Export collection

* mongodump -h ds125716.mlab.com:25716 -d locolink -c <collection> -u <user> -p <password> -o <output directory>


#### Install with Bower




