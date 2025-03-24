<script lang="ts">

    import "../../styles/edit-blocks/text-block.css";

    interface textBlock {
        title: string
        text: string

    }

    export let block_id: number;
    export let order: number;
    export let blockData: textBlock[];
    export let moveBlock;

    function saveChanges() {
        let title = Array.from(document.getElementById("text-block")?.querySelectorAll("title") ?? []).map(el => el.textContent ?? "").join(" ");
        let text = Array.from(document.getElementById("text-block")?.querySelectorAll("body") ?? []).map(el => el.textContent ?? "").join(" ");
        let data: textBlock = {
            title: title,
            text: text
        }
    }

</script>

<div class="text-block" style="--blockOrder: {order}">
    <input type="text" class="title" name="title" placeholder="Enter Title here" value="{blockData[0]['title']}" >
    <textarea class="title" name="title" placeholder="Enter Title here">{blockData[0]["text"]}</textarea>
    <input type="submit" class="button" value="Save Changes" on:click={saveChanges}>
    <div class="buttons">
        <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
        <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
    </div>

</div>

