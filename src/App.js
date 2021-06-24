import { useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === '') return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await axios.get(endpoint);
    const data = response.data.query;
    setResults(data.search);
    setInfo(data.searchinfo);
    console.log(data);
  };
  return (
    <div className='App'>
      <header>
        <h1>Wiki Search</h1>
        <form className='searchInput' onSubmit={handleSearch}>
          <input
            type='search'
            placeholder='What are you looking for?'
            className='inputBox'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {info.totalhits ? <p>Search Results: {info.totalhits}</p> : ''}
      </header>
      <div className='results'>
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className='result' key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target='_blank' rel='noreferrer'>
                More
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
