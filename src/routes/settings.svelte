<script context="module">
  import { client } from '../data.js';
  // import ApolloClient from 'apollo-boost';
  // import { setClient } from 'svelte-apollo';
  // import { gql } from 'apollo-boost';

  // const client = new ApolloClient({ uri: '' });
  // setClient(client);
  const EVERYTHING = `
    # everything needed for route...
    # (cache misses fall back to loading)
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: EVERYTHING
      })
    }
  }
</script>

<script>
  import { setClient, restore, query } from 'svelte-apollo';
  import Account from '../components/Account.svelte';
  // import GET_PREFERENCES from '../data/queries';

  const GET_PREFERENCES = {};

  export let cache;
  restore(client, EVERYTHING, cache.data);
  setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const preferences = query(client, GET_PREFERENCES);
</script>

<Account />

{#await $preferences}
  Loading won't be shown if preloaded
{:then result}
  ...
{/await}
