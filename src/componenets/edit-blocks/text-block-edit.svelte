<script lang="ts">

    import "../../styles/edit-blocks/text-block.css"
    import {onMount} from "svelte";

    interface textBlock {
        title: string
        text: string

    }

    //export let blockData: textBlock
    /*
    let data: textBlock = {
        "data": {
            "title": "Lorem Ipsum",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    }
    */


    function saveChanges() {
        let title = Array.from(document.getElementById("text-block")?.querySelectorAll("title") ?? []).map(el => el.textContent ?? "").join(" ");
        let text = Array.from(document.getElementById("text-block")?.querySelectorAll("body") ?? []).map(el => el.textContent ?? "").join(" ");
        let data: textBlock = {
            title: title,
            text: text
        }
    }
    function moveUp() {

    }

    function moveDown() {

    }
    /*
    let data: textBlock = {
        title: title,
        text: text
    }
    */
</script>

<div class="text-block">
    <!--
    <h3>{blockData["data"]["title"]}</h3>
    <p>{blockData["data"]["text"]}</p>
    -->
    <input type="text" class="title" name="title" placeholder="Enter Title here">
    <input type="text" class="text" name="body" placeholder="Enter Body text here">
    <input type="submit" class="button" value="Save Changes" on:click={saveChanges}>
    <div class="buttons">
        <button class="up" on:click={moveUp}>Move Up</button>
        <button class="down"  on:click={moveDown} >Move Down</button>
    </div>

</div>