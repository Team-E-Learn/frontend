import { apiBaseUrl } from "../shared/constants";
import type { Lesson, LessonBlock } from "./types";

// makes a GET request to the endpoint at /v1/module/{moduleId}/lessons
// returns the lessons if successful
// throws an error otherwise
const getLessons = async (moduleId: number) => {
    const url = new URL(`${apiBaseUrl}/v1/module/${moduleId}/lessons`);
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { lessons: Lesson[] } = await response.json();
    return data;
};

// makes a POST request to the endpoint at /v1/module/lessons
// passes the lesson_id, module_id, and title as formdata
// returns nothing if successful
// throws an error containing the relevant message otherwise
const addLesson = async (
    lessonId: number,
    moduleId: number,
    title: string,
) => {
    const url = `${apiBaseUrl}/v1/module/lesson`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            lesson_id: lessonId.toString(),
            module_id: moduleId.toString(),
            title: title,
        }),
    });

    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
};

// makes a DELETE request to the endpoint at /v1/module/lesson
// passes the lesson_id as formdata
// returns nothing if successful
// throws an error containing the relevant message otherwise
const deleteLesson = async (lessonId: number) => {
    const url = `${apiBaseUrl}/v1/module/lesson`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            lesson_id: lessonId.toString(),
        }),
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
};

// makes a GET request to the endpoint at /v1/module/lesson/{lessonId}/block
// returns the lessson blocks if successful
// throws an error containing the relevant message otherwise
const getLessonBlocks = async (lessonId: number) => {
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "GET",
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
    const data: { blocks: LessonBlock[] } = await response.json();
    return data;
};

// makes a POST request to the endpoint at /v1/module/lesson/{lessonId}/block
// passes the block_id, block_type, order, and data as formdata
// returns nothing if successful
// throws an error containing the relevant message otherwise
const addLessonBlock = async (lessonId: number, block: LessonBlock) => {
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            lesson_id: lessonId.toString(),
            block_id: block.block_id.toString(),
            block_type: block.block_type.toString(),
            order: block.order.toString(),
            name: block.name,
            data: JSON.stringify(block.data)
        })
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
}

// makes a DELETE request to the endpoint at /v1/module/lesson/{lessonId}/block
// returns nothing if successful
// throws an error containing the relevant message otherwise
const deleteLessonBlock = async (lessonId: number, blockId: number) => {
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            block_id: blockId.toString()
        })
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
}

export default {
    getLessons,
    addLesson,
    deleteLesson,
    getLessonBlocks,
    addLessonBlock,
    deleteLessonBlock
};
