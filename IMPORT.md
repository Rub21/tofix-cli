# Export and Import the tasks

requirements: the user should be a superadmin, set your superadmin credentials

create a folder called `export`and the get into it and run the next command lines

###  1. Export data from the server

`tfcli production export`

### Download your backup of geojson of last update

`s3://tofix/tasks/geojson`

Download the files into files folder.

`aws s3 sync  s3://tofix/tasks/geojson/ .`

### Import data from the server

` tfcli production import`


