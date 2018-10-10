# To-fix-backend CLI

### Istalation

```
$ git clone https://github.com/Rub21/tofix-cli.git
$ cd tofix-cli/
$ npm link

```

# Usage Projects


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
tfcli list-projects

```

### Delete a project

```
tfcli delete-project --idProject="xxx"

```

# Usage Items


### Create items

```
 tfcli create-items --file=unconnectedhighways.geojson --idProject="5695a0fb-a41a-4736-ae65-93a42811433b"
```

### List items in a project

```
tfcli list-items --idProject="7f03215c-bad1-4333-80d2-511934c9339b" --query="page=0&page_size=5000"
```

Check more here 👉https://github.com/osmlab/to-fix-backend/blob/master/API.md#get-items

### Delete Items in a project

```
tfcli delete-items --idProject="7f03215c-bad1-4333-80d2-511934c9339b" --file=output.json

```
