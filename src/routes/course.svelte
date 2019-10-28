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
      <p>{value.description}</p>
      {#each value.content as content, index}
        <p>{content.module}</p>
        {#each content.clips as clip, index}
          <p>{index + 1}강</p>
          <p>{clip}</p>
        {/each}
      {/each}
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

<div class="clip-container">
  <div id="video-first"></div>
  <NoteList class="note-list" notes={$notes} handleNoteEntryClick={handleNoteEntryClick} handleNoteInputChange={handleNoteInputChange} handleNoteInputInput={handleNoteInputInput}/>
</div>

<style>
  #video-first {
    float: left;
  }
</style>

<script type="text/javascript">
  import { onMount } from 'svelte';
  // import Vimeo from 'vimeo';
  import Player from '@vimeo/player';
  import axios from 'axios';
  import { query, notes } from '../store.js';
  import NoteList from '../components/NoteList.svelte';
  import { get } from 'svelte/store';

  let player;

  let stories = [];
  // let isLoading = false;

  let hacker, searchQuery;

  function handleChange (event) {
    axios.post(`http://localhost:3000/api/clips/new`, {
      vimeo_id: event.target.value
    });
  };

  async function handleNoteInputInput () {
    await player.pause();
  }

  async function handleNoteInputChange (e) {
    // await player.pause();
    const res = await axios.post('http://localhost:3000/api/notes/new', {
      content: e.target.value,
      clip_timestamp: await player.getCurrentTime()
    });

    e.target.value = '';
    const value = get(notes);
    notes.set([...value, res.data.note]);
    await player.play();
  }

  async function handleNoteEntryClick (e) {
    await player.setCurrentTime(parseInt(e.target.dataset.stamp));
  }

  var options01 = {
    id: 111172,
    width: 500
  };

  onMount(() => {
    // hacker = fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty').then(data => data.json());

    hacker = axios.get('http://localhost:3000/api/courses/all');

    // hacker = fetch(`https://api.vimeo.com/videos?query=${query}`);

    // hacker = vimeo.request({
      // method: 'GET',
      // path: `https://api.vimeo.com/videos?query=${query}`
    // });

    player = new Player('video-first', options01);

    player.setVolume(0);
    player.setLoop(true);
    player.play();

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
  //   isLoading = false;
  // });
</script>
