# Solidatus CLI

A very simple CLI for executing some Solidatus commands.

Requires Node.JS 8.11 or greater.

Install dependencies by executing `npm i`.

## update: Apply API commands to a model

**Supported API methods**

- **Update** - `/api/v1/models/<model_id>/update`
  - ReplaceModel
  - ReplaceEntity

Sample JSON files in `json/`

```
Usage: node index.js update ReplaceModel|ReplaceEntity [arguments...]

Commands:
  index update  Update a model (uses /api/v1/models/<model_id>/update)

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

**Example**

```
node index update ReplaceModel --model 5d81fb9e1dd9340001c0a6b4 --input json/model1.json --host https://demo.solidatus.com --token qwertyuiop

node index update ReplaceEntity --model 5d81fb9e1dd9340001c0a6b4 --entity 01de253a-b668-46a6-a3bf-f09ac4c34ebf --input json/entity2.json --comparator id --host https://demo.solidatus.com --token qwertyuiop
```

## apply-properties: Load properties from a CSV file

The apply-properties command takes a CSV file containing properties and updates the properties in a model based on an ID property.

For example, withh existing Solidatus model which has entities which represent applications each with an "Application ID" property, the apply-properties command could load the following CSV file.

| Application ID | Description             | IT Owner | Data Steward | 
|----------------|-------------------------|----------|--------------| 
| APP-123        | This is the application | Dan      | Dan          | 
| APP-124        | This is the application | Rob      | Rob          | 
| APP-125        | This is the application | Max      | Max          | 
| APP-126        | This is the application | Alice    | Alice        | 
| APP-127        | This is the application | Dan      | Rob          | 
| APP-128        | This is the application | Rob      | Max          | 

The properties would be added/updated to those entities where the "Application ID" matches that in the CSV.

```
npm start apply-properties --host https://solidatus --token <api_token> --model <model_id> --id-column "Application ID" --input <data.csv>
```

This would apply properties Description, IT Owner, Data Steward to all entities in the model which match an Application ID value in their Application ID property.
