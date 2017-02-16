# To-fix-backend CLI

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

`tfcli staging create --name 'test' --description 'descripcion' --comment 'comments' --file output_geojson.geojson`

### List tasks

`tfcli staging list`

### Update a Task


`tfcli staging update  --idtask 'abc' --name 'test' --description 'descripcion' --comment 'comments' --file output_geojson.geojson`


### Delete a task

`txcli staging delete --idtask unconnectedmajorhighwayshmdcz`

### Change user role

`tfcli staging changerole --role superadmin --iduser 51320836`

### Delete a user

`tfcli staging deleteuser --iduser 51320836`

### List users

`tfcli staging listusers`

### [Export and Import](https://github.com/Rub21/tofix-cli/blob/master/IMPORT.md)