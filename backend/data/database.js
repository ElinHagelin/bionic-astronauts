import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

function getDb() {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const file = `${__dirname}/db.json`
	const adapter = new JSONFile(file)
	const db = new Low(adapter, {})
	return db
}

export { getDb }