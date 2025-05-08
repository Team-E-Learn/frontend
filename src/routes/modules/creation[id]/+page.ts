import {error} from "@sveltejs/kit"; // import error
import type {PageLoad} from "./$types"; // import the page load data

export const load: PageLoad = ({ params }) => {
    if (params.id){
        return{
            module_id: params.id
        };
    }

    error(404, "not found");
}