# Solidatus CLI

A very simple CLI for executing some Solidatus commands.

Requires Node.JS 8.11 or greater.

Install dependencies by executing `npm i`.

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
node index update ReplaceEntity --model 5d81fb9e1dd9340001c0a6b4 --entity 01de253a-b668-46a6-a3bf-f09ac4c34ebf --input json/entity2.json --comparator id --host https://demo.solidatus.com --token qwertyuiop
```
