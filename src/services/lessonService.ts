import { apiBaseUrl } from "../shared/constants";
import type { Lesson, LessonBlock } from "./types";

const getLessons = async (moduleId: number) => {
    const url = new URL(`${apiBaseUrl}/v1/module/${moduleId}/lessons`);
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { lessons: Lesson[] } = await response.json();
    return data;
};

const addLesson = async (
    lessonId: number,
    moduleId: number,
    title: string,
    sections: {[key: string]: any},
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
            sections: JSON.stringify(sections),
        }),
    });

    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
};

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

const addLessonBlock = async (lessonId: number, block: LessonBlock) => {
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            lesson_id: lessonId.toString(),
            block_type: block.block_type.toString(),
            order: block.block_order.toString(),
            data: JSON.stringify(block.data)
        })
    });
    if (!response.ok) {
        const data: { message: string } = await response.json();
        throw new Error(data.message);
    }
}

const deleteLessonBlock = async (lessonId: number, block_type: number, order: number) => {
    const url = `${apiBaseUrl}/v1/module/lesson/${lessonId}/block`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            lesson_id: lessonId.toString(),
            block_type: block_type.toString(),
            order: order.toString(),
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
