<script lang="ts">
    import '../styles/module-creation/text-entry.css'

    export let text: string;
    export let id: string = "default";
</script>

<div class="entry hidden" id={id}>
    <div class="center">
        <h2>{text}</h2>
        <input class="text" value="">
    </div>
</div>