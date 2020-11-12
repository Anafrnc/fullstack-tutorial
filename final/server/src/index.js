require('dotenv').config();

import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}
render(<App />, document.getElementById('root'));


const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});


const Missions = gql`
  query getFiveMissions {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const Launch = () => {
  const { loading, error, data } = useQuery(Missions);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error {error}</p>;

  return data.launches.map((launch) => (
    <div key={launch.id}>
      <h5>Launch: #{launch.id}</h5>
      <p>{launch.details}</p>
      <p>Rocket: {launch.rocket.rocket_name}</p>
      <a href={launch.links.video_link}>link</a>
    </div>
  ));
};

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>My first Apollo app 🚀</h2>
        <Launch />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));