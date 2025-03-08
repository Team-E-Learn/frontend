<script lang="ts">
    import '../../../styles/module-creation/creation.css'; // Import styles
    export let left = 100;
    export let top = 100;

    let moving = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    function onMouseDown(e: MouseEvent) {
        moving = true;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = left;
        offsetY = top;
    }

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp() {
        moving = false;
    }

    // 	$: console.log(moving);
</script>

<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="block-preview">
    <slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />