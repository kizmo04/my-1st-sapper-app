<script>
  import { getClient, query } from 'svelte-apollo';
  // import { GET_ACCOUNT } from '../data/queries';

  const GET_ACCOUNT = ``;
  const client = getClient();
  const account = query(client, { query: GET_ACCOUNT });
</script>

{#await $account}
  Loading won't be shown if sufficient data loaded in preload
{:then result}
  ...
{/await}
