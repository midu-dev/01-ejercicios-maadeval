const fs = require('node:fs/promises')
const path = require('node:path')
const process = require('node:process')

// Ejercicio 2
async function writeFile(filePath, data, callback) {
  const foldersOnFilePath = path.dirname(filePath)

  fs.mkdir(foldersOnFilePath, { recursive: true }).catch(callback)

  fs.writeFile(filePath, data)
    .then(() => callback(null))
    .catch(callback)
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const filePathByArgv = process.argv[2]

  const isFilePathByArgvUndefined = typeof filePathByArgv === 'undefined'
  if (isFilePathByArgvUndefined)
    return callback(
      new NoPathSpecifiedError(READ_FILE_AND_COUNT_ERRORS.NO_PATH_SPECIFIED)
    )

  const isWordEmpty = word == null
  if (isWordEmpty)
    return callback(
      new NoWordSpecifiedError(READ_FILE_AND_COUNT_ERRORS.NO_WORD_SPECIFIED)
    )

  fs.readFile(filePathByArgv, 'utf-8')
    .then((fileContent) => {
      const listOfCoincidences = fileContent.match(new RegExp(word, 'gi')) ?? []
      return callback(null, listOfCoincidences.length)
    })
    .catch(() => callback(null, 0))
}

const READ_FILE_AND_COUNT_ERRORS = {
  NO_PATH_SPECIFIED: 'No se ha especificado el path del archivo',
  NO_WORD_SPECIFIED: 'No se ha especificado la palabra a buscar',
}

class NoPathSpecifiedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoPathSpecifiedError'
  }
}

class NoWordSpecifiedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoWordSpecifiedError'
  }
}

module.exports = {
  writeFile,
  readFileAndCount,
}
