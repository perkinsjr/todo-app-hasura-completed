import {ButtonCheckbox} from "../../components/Checkbox/Checkbox"
import {useMutation} from "@apollo/client";
import {COMPLETE_TODO , GET_TODOS} from "../../lib/queries";



export const Todo = ({todo}) => {
    const [completetodoMutation] = useMutation(COMPLETE_TODO);

    const completeTodo = (e) => {
        e.preventDefault();
        completetodoMutation({
            variables: {id: todo.id},
            optimisticResponse: true,
            update: (cache) => {
                const data = cache.readQuery({query: GET_TODOS});
                const todos = data.todos.filter(({id}) => id !== todo.id)
                cache.writeQuery({
                    query: GET_TODOS,
                    data: {todos}
                })  
            }
        })
    }

    return(
        <ButtonCheckbox value={todo.id} onChange={completeTodo} id={todo.id} title={todo.title}note={todo.note}></ButtonCheckbox>
    )
}
