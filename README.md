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


### Create a project

**Private project**

`tf dev createp --name 'Navegacion' --description 'Navegation osm project' --private false --users Rub21_nycbuildings,ediyes,samely`

**Public project**

`tf dev createp --name 'Navegacion'  --description 'Navegation osm project' --private false`

### Create a task

`tf staging create --name 'test' --description 'descripcion' --comment 'comments' --file output_geojson.geojson`

### List tasks

`tf staging list`

### Update a Task


`tf staging update  --idtask 'abc' --name 'test' --description 'descripcion' --comment 'comments' --file output_geojson.geojson`


### Delete a task

`txcli staging delete --idtask unconnectedmajorhighwayshmdcz`

### Change user role

`tf staging changerole --role superadmin --iduser 51320836`

### Delete a user

`tf staging deleteuser --iduser 51320836`

### List users

`tf staging listusers`

### [Export and Import](https://github.com/Rub21/tofix-cli/blob/master/IMPORT.md)