#!/usr/bin/env node

const fs = require('fs')
const homedir = require('os').homedir()
const exec = require('child_process').exec

function getPrivKey() {
  try {
    const fetchHeadDir = './.git/'
    var fetchHeadFile = fetchHeadDir + 'FETCH_HEAD'

    var fetchHead = fs.readFileSync(fetchHeadFile).toString()

    var repo = fetchHead
      .split(' ')
      .pop()
      .replace(':', '/')
      .replace('\n', '')

    const gitmarkRepoBase = homedir + '/.gitmark/repo'

    const gitmarkFile = gitmarkRepoBase + '/' + repo + '/gitmark.json'

    return require(gitmarkFile).privkey58
  } catch (e) {
    const fetchHeadDir = './.git/'
    var fetchHeadFile = fetchHeadDir + 'FETCH_HEAD'

    var fetchHead = fs.readFileSync(fetchHeadFile).toString()

    var repo = fetchHead
      .split(' ')
      .pop()
      .replace(':', '/')
      .replace('\n', '')

    const gitmarkRepoBase = homedir + '/.gitmark/repo'

    const gitmarkFile = gitmarkRepoBase + '/' + repo + '/gitmark.json'

    console.log('no priv key found in', gitmarkFile)
    return undefined
  }
}


function findValueByPrefix(object, prefix) {
  for (var property in object) {
    if (
      object.hasOwnProperty(property) &&
      property.toString().startsWith(prefix)
    ) {
      return { k: property, v: object[property] }
    }
  }
}

function withdrawToAddress(address, pubkey) {
  const amount = 10
  const fee = 10
  pubkey = pubkey || 'bUnZHeiSuxervBUWBGsKp73Nxj67RnHeri'
  const serverCmd = 'ssh -i ~/.ssh/id_btm ubuntu@157.90.144.229'

  // validate address
  if (address.length !== 34) {
    console.error('invalid address', address)
    return
  }

  // get ledger
  var ledgerFile = process.cwd() + '/webcredits/webledger.json'
  var ledger = require(ledgerFile)
  if (!ledger) {
    console.error('no ledger found at', ledgerFile)
    return
  }

  // get txo:
  var txo = findValueByPrefix(ledger, 'txo:')
  if (!txo) {
    console.error('no txo found')
    return
  }
  console.log('txo:', txo)

  // get amounts
  var newamount = txo.v - (amount + fee)

  // get key
  var key = getPrivKey()
  console.log(key)

  // translate key into base58address

  // build tx
  // TODO: round division
  var createrawtransaction = `${serverCmd} bin/txc.sh ${txo.k.split(':')[1]} ${txo.k.split(':')[2]
    } ${address} ${amount / 1000000} ${key} ${pubkey} ${newamount / 1000000}`
  console.log(createrawtransaction)

  // trap response
  exec(createrawtransaction, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
    stdout = stdout.replace('\n', '')
    var newtxo = `txo:${stdout}:1`
    console.log('newtxo', newtxo)
    if (stdout && stdout.length === 64) {
      // if successful update ledger
      // subtract txo
      delete ledger[txo.k]
      ledger[newtxo] = newamount
      // write ledger
      console.log('ledger', JSON.stringify(ledger, null, 2))
      fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2))
    }
  })
}

function txoparse(txo) {
  var ret = {}

  // check string exists
  if (!txo) {
    return ret
  }

  // check txo: uri
  if (!txo.match(/txo:/)) {
    return ret
  }

  // get address
  var address = txo.split(':')
  if (!address) {
    return ret
  }

  // get tx and vout
  ret.tx = address[1]
  ret.vout = address[2] || 0

  return ret
}

var serverKey = process.argv[2] || 'bYr2oQVDgV7g2DVqtwUDtkywYGAuBvs52A'
var pubkey = process.argv[3] || 'bUnZHeiSuxervBUWBGsKp73Nxj67RnHeri'

console.log('serverKey', serverKey)
console.log('pubkey', pubkey)

withdrawToAddress(serverKey, pubkey)