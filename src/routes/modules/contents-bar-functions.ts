

export function handleLessonButtonClick(event, loadedLessons: number[], creation: boolean, updateLessons: (lessons: number[]) => void){
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    // Return if the pressed button isn't the lesson button
    if (!target.classList.contains("lesson-button")) return;

    let contents = document.querySelector(".contents");
    if (!contents) return;

    // If the button is active, make the contents element small or large if it's already small
    if (target.classList.contains("active")) {
        toggleContentsSize(contents);
        if (creation)
            creationBarToggles(contents);
        return;
    }

    updateActiveButton(target);
    addLessonToLoaded(target, loadedLessons, updateLessons);
}

function toggleContentsSize(contents) {
    contents.classList.toggle("small");
}

function creationBarToggles(contents){
    let selection = document.querySelector(".selection");
    let blocks = document.querySelector(".blocks");
    let editor = document.querySelector(".block-editor");
    if(!selection || !blocks || !editor) return;

    // Activates selection tools when bar is smalls
    if (contents.classList.contains("small")) {
        selection.classList.remove("hidden")
    }
    // Removes all the tools other than the lessons section when bar is large
    else {
        selection.classList.add("hidden")
        blocks.classList.add("hidden")
        editor.classList.add("hidden")
    }
}

function updateActiveButton(target){
    // Remove the active tag from every button and add active to the pressed button
    document.querySelectorAll(".lesson-button").forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
}


function addLessonToLoaded(target, loadedLessons, updateLessons: (lessons: number[]) => void) {
    const lessonId = Number(target.dataset.lesson_id);
    if (!loadedLessons.includes(lessonId)) {
        console.log("added")
        updateLessons([...loadedLessons, lessonId]);
    }
    updateLessonContainers(lessonId, loadedLessons);
}

function updateLessonContainers(lessonId, loadedLessons) {
    const cachedContainer = document.getElementById("cached-lesson");
    const loadedContainer = document.getElementById("loaded-lesson");

    if (!cachedContainer || !loadedContainer) {
        console.log("returned")
        return;
    }

    loadedLessons.forEach(id => moveLessonToContainer(id, cachedContainer));
    moveLessonToContainer(lessonId, loadedContainer);
}


function moveLessonToContainer(lessonId, container) {
    const blockDiv = document.getElementById(`blocks-${lessonId}`);
    if (blockDiv) {
        console.log("hit")
        container.appendChild(blockDiv);
    }
}