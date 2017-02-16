# to-fix-backend CLI

### Istalation

```
$ git clone https://github.com/Rub21/tofix-cli.git
$ cd tofix-cli/
$ npm link

```

### Usage

- dev, staging, production

`export token="xxx"`

### Create a task

`tfcli staging create --name 'test' --description 'descripcion' --changesetcomment 'comments' --file output_geojson.geojson`

### List tasks

`tfcli staging list`

### Update a Task


`tfcli staging update  --idtask 'abc' --name 'test' --description 'descripcion' --changesetcomment 'comments' --file output_geojson.geojson`


### Delete a task

`txcli staging delete --idtask unconnectedmajorhighwayshmdcz`

### Change user role

`tfcli staging changerole --role superadmin --iduser 51320836`

### Delete a user

`tfcli staging deleteuser --iduser 51320836`

### list users

`tfcli staging listusers`

### Export data from the server

requirements: the user should be a superadmin

`tfcli production export`

### Import data from the server

` tfcli production import`
