// This file is the entry point to the script which purely handles command line arguments

const yargs = require('yargs')
const fs = require('fs')
const _ = require('lodash')
const replaceModelCommand = require('./src/update/replaceModelCommand')
const replaceEntityCommand = require('./src/update/replaceEntityCommand')
const executeCommands = require('./src/node-fetch/executeCommands')
const createModelCommand = require('./src/createModelCommand')
const applyPropertiesCommand = require('./src/applyPropertiesCommand')

const yargsAddHostParams = yargs =>
  yargs
    .option('host', {
      demandOption: true,
      describe: 'The URL of the Solidatus instance',
      type: 'string'
    })
    .option('token', {
      demandOption: true,
      describe: 'Solidatus API token',
      type: 'string'
    })
    .option('proxy', {
      describe: 'The URL of the proxy',
      type: 'string'
    })

const yargsUpdateCommand = yargs => {
  yargs
    .command(
      'ReplaceModel',
      'Replaces the specified model with the provided JSON',
      yargs => {
        yargs
          .option('comparator', {
            default: 'id',
            describe: 'The comparator',
            choices: ['id', 'name', 'path', 'property']
          })
          .option('comparatorProperty', {
            describe: 'The comparator property'
          })
          .option('input', {
            demandOption: true,
            describe: 'The file containing Solidatus JSON input'
          })
      },
      replaceModelCommand
    )
    .command(
      'ReplaceEntity',
      'Replaces the specified entity with the provided JSON',
      yargs => {
        yargs
          .option('entity', {
            demandOption: true,
            describe: 'The ID of the entity to be replaced'
          })
          .option('comparator', {
            default: 'id',
            describe: 'The comparator',
            choices: ['id', 'name', 'path']
          })
          .option('input', {
            demandOption: true,
            describe: 'The file containing Solidatus JSON input'
          })
      },
      replaceEntityCommand
    )
    .option('model', {
      demandOption: true,
      describe: 'The ID of the model'
    })
  yargsAddHostParams(yargs)
  return yargs
}

const yargsCreateCommand = yargs => {
  yargs.option('number', {
    alias: 'n',
    demandOption: true,
    describe: 'The number of models',
    default: 1
  })
  yargsAddHostParams(yargs)
  return yargs
}

const yargsApplyPropertiesCommand = yargs => {
  yargs
    .option('input', {
      demandOption: true,
      describe: 'The CSV file containing the properties'
    })
    .option('id-column', {
      demandOption: true,
      describe: 'The name of the column which has the property on which to identify entities'
    })
    .option('model', {
      demandOption: true,
      describe: 'The ID of the model'
    })
  yargsAddHostParams(yargs)
  return yargs
}

const yargsExecuteUpdateCommand = yargs => {
  yargs
    .option('modelId', {
      demandOption: true,
      describe: 'Solidatus model ID to update',
      type: 'string'
    })
    .option('cmds', {
      demandOption: true,
      describe: 'JSON stringified model update commands',
      type: 'string'
    })
    .option('nodeExtraCACerts', {
      demandOption: false,
      describe: 'Path to extra certs',
      type: 'string'
    })
  yargsAddHostParams(yargs)
}

yargs
  .usage('Usage: node index.js update ReplaceModel|ReplaceEntity [arguments...]')
  .usage('Usage: node index.js create [arguments...]')
  .usage('Usage: node index.js apply-properties [arguments...]')
  .usage('Usage: node index.js execute-commands [arguments...]')
  .command('update', 'Update a model (uses /api/v1/models/<model_id>/update)', yargsUpdateCommand)
  .command('create', 'Creates one or more models', yargsCreateCommand, createModelCommand)
  .command(
    'apply-properties',
    'Apply properties to entities from a CSV file',
    yargsApplyPropertiesCommand,
    applyPropertiesCommand
  )
  .command(
    'execute-commands',
    'Execute commands on model passed in as JSON string arguments',
    yargsExecuteUpdateCommand,
    executeCommands
  )
  .demandCommand()
  .help().argv
