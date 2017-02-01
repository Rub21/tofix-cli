# to-fix-backend CLI
### Istalation

`npm install`

### Usage

- dev, staging, production

`export token="xxx"`

#### Create a task

`tfcli staging create --file sample.geojson`

### List tasks

`tfcli -l staging`

### Update a Task

```
tfcli staging update -id unconnectedmajorhighwayshmdcz -file sample.geojson 
```

### Delete a task

`txcli staging delete --id unconnectedmajorhighwayshmdcz`

#### Change user role

`tfcli staging  changerole --role superadmin --iduser 51320836`

#### Delete a user

`tfcli staging deleteuser --iduser 51320836`


### Setting a task 

`tfcli replacetask staging  --id tigerdeltauadtb`
