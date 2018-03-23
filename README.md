# To-fix-backend CLI

### Istalation

```
$ git clone https://github.com/Rub21/tofix-cli.git
$ cd tofix-cli/
$ npm link

```

### Usage

```
export TOKEN=XXX
export HOST=http://35.171.167.220:8000
```

### Create a Project

```
tfcli create-project --name="Unconnected highways" --comment="#to-fix fixing unconnected highways"

```

### List Projects

```
tfcli list-project

```
### Create items

```
 tfcli create-items --file=unconnectedhighways.geojson --idProject="46e648c4-5a49-46b8-8bc7-2f49cae23274"
```