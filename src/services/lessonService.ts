import { apiBaseUrl } from "../shared/constants";
import type { Lesson, LessonBlock } from "./types";

// makes a GET request to the endpoint at /v1/module/{moduleId}/lessons
// returns the lessons if successful
// throws an error otherwise
const getLessons = async (moduleId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = new URL(`${apiBaseUrl}/v1/module/${moduleId}/lessons`);
    const response = await fetch(
        url, 
        { 
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
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
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = `${apiBaseUrl}/v1/module/lesson`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
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
const deleteLesson = async (moduleId: number, lessonId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/module/lesson/`;

    const formData = new FormData();
    formData.append("module_id", moduleId.toString());
    formData.append('lesson_id', lessonId.toString());

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
};

// makes a GET request to the endpoint at /v1/module/lesson/{lessonId}/block
// returns the lesson blocks if successful
// throws an error containing the relevant message otherwise
const getLessonBlocks = async (moduleId: number, lessonId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block` + new URLSearchParams({
        module_id: moduleId
    }).toString();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
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
const addLessonBlock = async (moduleId: number, lessonId: number, block: LessonBlock) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({
            module_id: moduleId.toString(),
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
const deleteLessonBlock = async (moduleId: number, lessonId: number, blockId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const formData = new FormData();
    formData.append('block_id', blockId.toString());
    formData.append("module_id", moduleId.toString());

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
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
