import {Stack} from "@chakra-ui/react";
import {Todo} from "./Todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "../../lib/queries";


export const Todos = () => {
    const {loading, error, data} = useQuery(GET_TODOS);
    if(loading) return "loading...."
    if (error) return <div>{error}</div>
    return(
        <Stack spacing="5" justify="flex-start">
            {data?.todos?.map((todo) => (
            <Todo key={todo.id} todo={todo}/> 
            ))}
        </Stack>
    )
}