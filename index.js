const yargs = require('yargs')
const fs = require('fs')
const _ = require('lodash')
const replaceModelCommand = require('./src/update/replaceModelCommand')
const replaceEntityCommand = require('./src/update/replaceEntityCommand')
const createModelCommand = require('./src/createModelCommand')

yargs
  .usage('Usage: node index.js update ReplaceModel|ReplaceEntity [arguments...]')
  .command('update', 'Update a model (uses /api/v1/models/<model_id>/update)', yargs => {
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
      .option('host', {
        demandOption: true,
        describe: 'The URL of the Solidatus instance',
        type: 'string'
      })
      .option('token', {
        demandOption: true,
        describe: 'The URL of the Solidatus instance',
        type: 'string'
      })
      .option('proxy', {
        describe: 'The URL of the proxy',
        type: 'string'
      })
  })
  .command(
    'create',
    'Creates one or more models',
    yargs => {
      yargs
        .option('number', {
          alias: 'n',
          demandOption: true,
          describe: 'The number of models',
          default: 1
        })
        .option('host', {
          demandOption: true,
          describe: 'The URL of the Solidatus instance',
          type: 'string'
        })
        .option('token', {
          demandOption: true,
          describe: 'The URL of the Solidatus instance',
          type: 'string'
        })
        .option('proxy', {
          describe: 'The URL of the proxy',
          type: 'string'
        })
    },
    createModelCommand
  )
  .demandCommand()
  .help().argv
