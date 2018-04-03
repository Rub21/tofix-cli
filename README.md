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
export HOST=http://54.209.223.159:8000/v1
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
 tfcli create-items --file=unconnectedhighways.geojson --idProject="5695a0fb-a41a-4736-ae65-93a42811433b"
```