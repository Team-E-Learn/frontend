import {error} from "@sveltejs/kit";
import type {PageLoad} from "./$types";

export const load: PageLoad = ({ params }) => {
    if (params.id){
        return{
            module_id: params.id
        };
    }

    error(404, "not found");
}