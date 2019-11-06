<script type="text/javascript">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { notes, events } from '../store.js';

  let content;
  export let handleNoteInputChange;
  export let handleNoteInputInput;
  export let handleNoteEntryClick;

  onMount(async () => {
    const res = await axios.get('http://localhost:3000/api/notes/all');
    notes.set(res.data.notes);

    const resEvents = await axios.post('http://localhost:4000/graphql', {
      query: `query {
                events {
                  title
                }
              }`
    });

    events.set(resEvents.data.data.events);
  });
</script>

<style lang="scss">
$note-list-border: 3px solid yellow;

.note-entry {
  cursor: pointer;
}

.note-list {
  overflow-y: scroll;
  border: $note-list-border;
}

h1 {
  float: left;
}

ul {
  float: left;
}

</style>

<h1>Recent Notes</h1>

<ul class="note-list">
  <!-- {#await notes}
    <p>Loading...........</p>
  {:then values}
    {#if values}
      {#each values.data.notes as note}
        <li class="note-entry" data-stamp={note.clip_timestamp} on:click={handleNoteEntryClick}>{note.content}</li>
      {/each}
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await} -->
  {#each $notes as note}
    <li class="note-entry" data-stamp={note.clip_timestamp} on:click={handleNoteEntryClick}>{note.content}</li>
  {/each}
  <input type="text" bind:value={content} on:change={handleNoteInputChange} on:input={handleNoteInputInput}>
  <p>엔터키로 노트 입력</p>
</ul>

{#each $events as event}
  <p>{event.title}</p>
{/each}
