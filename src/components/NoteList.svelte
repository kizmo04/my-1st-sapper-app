<script context="module">
  // export async function preload({ host, path, params, query }, session) {
  //   const res = await this.fetch('http://localhost:3000/api/notes/all');
  //   if (res.status === 200) {
  //     const notes = await res.json();
  //     return { notes };
  //   }

  //   this.error(404, 'Not found');
  // }
</script>
<script type="text/javascript">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { notes } from '../store.js';

  let content;
  export let handleNoteInputChange;
  export let handleNoteInputInput;
  export let handleNoteEntryClick;

  onMount(async () => {
    const res = await axios.get('http://localhost:3000/api/notes/all');
    notes.set(res.data.notes);
  });
</script>

<style>
.note-entry {
  cursor: pointer;
}

.note-list {
  overflow-y: scroll;
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
