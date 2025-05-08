interface Verify2faSuccessResponse {
    message: "success";
    full_access_jwt: string;
    user_id: number;
    account_type: string;
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
    data: any[];
}

export interface Lesson {
    id: number;
    title: string;
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
    id: number;
}
interface Bundle {
    bundle_id: number;
    bundle_name: string;
    modules: Module[];
}
export interface Subscription {
    name: string;
    id: number;
    bundles: Bundle[];
    modules: Module[];
}

export interface Module1 extends Module {
    description: string;
    org_id: number;
}

export interface Organisation {
    org_name: string,
    bundles: {
        bundle_name: string,
        modules: {
            name: string
        }[]
    }[]
    modules: {
        name: string
    }[]
}

export interface CreateOrganisationResponse {
    message: string;
    Organisation: {
        name: string;
        id: number;
        bundles: {
            bundle_id: number;
            bundle_name: string;
            modules: {
                name: string;
                module_id: number;
            }[];
        }[];
        modules: {
            id: number;
            name: string;
        }[];
    };
}
