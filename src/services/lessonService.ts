import { apiBaseUrl } from "../shared/constants";
import type { Lesson, LessonBlock } from "./types";

const getLessonSidebar = async (lessonId: number) => {
    const url = new URL(`${apiBaseUrl}/v1/module/lesson/${lessonId}`);
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { blocks: LessonBlock[] } = await response.json();
    return data;
};

const getLessons = async (moduleId: number) => {
    const url = new URL(`${apiBaseUrl}/v1/module/${moduleId}/lessons`);
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { lessons: Lesson[] } = await response.json();
    return data;
};

export default { getLessonSidebar, getLessons };
