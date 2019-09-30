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
