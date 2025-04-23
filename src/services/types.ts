interface Verify2faSuccessResponse {
    message: "success";
    full_access_jwt: string;
}

interface Verify2faFailureResponse {
    message: "Unauthorized";
}

export type Verify2faResponse =
    | Verify2faSuccessResponse
    | Verify2faFailureResponse;

export interface LoginResponse {
    message: string;
    limited_jwt: string;
}

export interface RegisterResponse {
    message: string;
    user: {
        id: number;
        email: string;
        username: string;
        secret: string;
    };
    token: string;
}

export interface LessonBlock {
    block_id: number;
    block_type: number;
    order: number;
    name: string;
    data: {
        [key: string]: string;
    };
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
}

interface AddModuleSuccessResponse {
    success: true;
    message: string;
}
interface AddModuleFailureResponse {
    success: false;
    error: string;
}
export type AddModuleResponse =
    | AddModuleSuccessResponse
    | AddModuleFailureResponse;

export interface DashboardElement {
    id: number;
    type: string;
    position: {
        x: number;
        y: number;
    };
}

export interface UserProfile {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accocuntType: "user" | "admin" | "teacher";
}

interface Module {
    name: string;
    module_id: number;
}
interface Bundle {
    bundle_id: number;
    bundle_name: string;
    modules: Module[];
}
export interface Subscription {
    org_name: string;
    org_id: number;
    bundles: Bundle[];
    modules: Module[];
}

export interface Module1 extends Module {
    description: string;
    org_id: number;
}

export interface Organisation {
    name: string;
    description: string;
    modules: { name: string; description: string }[];
    owner_id: number;
}

export interface CreateOrganisationResponse {
    message: string;
    Organisation: {
        id: number,
        name: string;
    };
    modules: { id: number; name: string; }[];
}
