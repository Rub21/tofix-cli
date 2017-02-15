# to-fix-backend CLI
### Istalation

`npm install`

### Usage

- dev, staging, production

`export token="xxx"`

#### Create a task

```
tfcli staging create --name 'test' --description 'descripcion' --changesetcomment 'comments' --file output_geojson.geojson

```

### List tasks

`tfcli -l staging`

### Update a Task

```
tfcli staging create  --idtask 'abc' --name 'test' --description 'descripcion' --changesetcomment 'comments' --file output_geojson.geojson

```

### Delete a task

`txcli staging delete --idtask unconnectedmajorhighwayshmdcz`

#### Change user role

`tfcli staging  changerole --role superadmin --iduser 51320836`

#### Delete a user

`tfcli staging deleteuser --iduser 51320836`


#### list users

`tfcli staging listusers`


### Setting a task 

`tfcli replacetask staging  --idtask tigerdeltauadtb`

### Update the noterro type

` tfcli staging  updateNoterror --idtask unconnectedmajorhighwaysbnrkv --file arraydekeys.json`
