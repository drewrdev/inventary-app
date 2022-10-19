import Loggito from '../utils/Loggito'


function Search({ onQuery }) {
    const logger = new Loggito('Search')

    const handleSubmit = event => {
        event.preventDefault()

        const query = event.target.query.value

        onQuery(query)
    }

    logger.info('return')

    return <form className="container container--row search-row" onSubmit={handleSubmit}>
        <input className="input" type="text" name="query"/>
        <button>🔍</button>
    </form>
}

export default Search