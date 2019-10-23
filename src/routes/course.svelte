<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

{#await hacker}
  <p>is Loading...</p>
{:then values}
  {#if values}
    {#each values.data.courses as value, index}
      <p>{value.title}</p>
    {/each}
  {/if}
  <!-- <ul>
    {#each stories as story, index}
      <li><p>{index}</p>{story.title}</li>
    {/each}
  </ul> -->
{:catch error}
  <p>{error}</p>
{/await}

<input type="text" bind:value={$query} on:change={handleChange}>
<p>검색어: {$query}</p>

<div id="video-first"></div>

<script type="text/javascript">
  import { onMount } from 'svelte';
  // import Vimeo from 'vimeo';
  import Player from '@vimeo/player';
  import axios from 'axios';
  import { query } from '../store.js';

  let player;

  let stories = [];
  // let isLoading = false;

  let hacker, searchQuery;

  function handleChange (event) {
    console.log('change')
    console.log(event.target.value);
  };

  var options01 = {
    id: 111172,
    width: 500
  };

  onMount(() => {
    // hacker = fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty').then(data => data.json());

    hacker = axios.get('http://localhost:3000/api/courses/all');

    // hacker = fetch(`https://api.vimeo.com/videos?query=${query}`);

    // const vimeo = new Vimeo('0cc6ad77f95ff8c9f3c41324d67f56d5de8e14e2', 'j+h52vhrdpEGerZ37h4FO08JLNiQ2SvY7nX4J9xdtiGYMR5GnCijeH/FyrkRvhdkMIMys/3Nl7B7Crr7lfSujb3Ovj1Ztz8/bpl5Jh1fz2XOYlnt+kPzDMJLUXgbnJSN', '1f6e3464f3f431ac5d733d18557fdf2d');

    // hacker = vimeo.request({
      // method: 'GET',
      // path: `https://api.vimeo.com/videos?query=${query}`
    // });

    player = new Player('video-first', options01);

    player.setVolume(0);

    player.on('play', () => {
      console.log('play!');
    });
  });

  // onMount(async () => {
  //   isLoading = true;
  //   const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  //   const BestStoryIds = await data.json();

  //   const requestBestStories = BestStoryIds.slice(0, 50).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
  //   datas = await Promise.all(requestBestStories);
  //   stories = await Promise.all(datas.map(data => data.json()));
  //   // isLoading = false;
  // });
</script>
