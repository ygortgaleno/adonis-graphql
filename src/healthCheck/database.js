const { Client } = require('pg')

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env

const sleep = (time) => new Promise(
  resolve => setTimeout(resolve, time)
)

const connect = async ({ retries, time }) => {
  if (retries === 0) {
    console.error('Can\'t connect into database exiting...')
    process.exit(1)
  }

  await sleep(time)
  console.log('Attempt to connect into database...')
  const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST
  })

  client.connect((error) => {
    client.end()

    if (error) {
      console.error('Failed to connect into database!')
      console.log('Performing new attempt in 5 seconds.')
      connect({ retries: retries - 1, time: 5000 })
    } else {
      console.log('Connected!')
    }
  })
}

connect({ retries: 5, time: 0 })
