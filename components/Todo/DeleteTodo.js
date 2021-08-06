import {Box, IconButton} from "@chakra-ui/react";
import {MdDelete} from "react-icons/md";
import {GET_TODOS,REMOVE_TODO} from "../../lib/queries";
import {useMutation} from "@apollo/client";

export const DeleteTodo = (value) => {
    const [removeTodoMutation] = useMutation(REMOVE_TODO);
    const removetodo = (e) => {
        e.preventDefault();
        removeTodoMutation({
            variables: {id: value.id},
            optimisticResponse: true, 
            update: (cache) => {
                const data = cache.readQuery({query: GET_TODOS});
                const todos = data.todos.filter(({id}) => id !== value.id)
                cache.writeQuery({
                    query: GET_TODOS,
                    data: {todos}
                })
            }
        })
    }
    return(
        <Box>
            <IconButton
            variant="outline"
            border="none"
            color="blue.500"
            aria-label="delete"
            fontSize="20px"
            onClick={removetodo}
            icon={<MdDelete/>}/>
        </Box>
    )
}