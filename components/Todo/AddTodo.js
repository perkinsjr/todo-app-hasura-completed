import {
    Box,
    Button,
    Input,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";

import {useMutation} from "@apollo/client";

import {ADD_TODO, GET_TODOS} from "../../lib/queries";

import {useState} from "react";

export const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleNoteChange = (event) => setNote(event.target.value);

    const [addTodo] = useMutation(ADD_TODO, {
        onCompleted: () => {
            setNote("")
            setTitle("")
            setLoading(false);
        }
    });

    const onSubmit = (e) =>{
        setLoading(true);
        e.preventDefault();
        addTodo({
            variables: {title,note},
            update: (cache, {data}) => {
                const existingTodos = cache.readQuery({query: GET_TODOS})
                cache.writeQuery({
                    query: GET_TODOS,
                    data: {todos: [data.insert_todos_one, ...existingTodos.todos]}
                })
            }
        })
    };

    return(
        <Accordion allowToggle mb="8" mt="2">
         <AccordionItem>
         <h2>
         <AccordionButton>
         <Box flex="1" textAlign="left">
             Add Todo
         </Box>
         <AccordionIcon/>
         </AccordionButton>   
        </h2>
        <AccordionPanel pb='4'>
        <form onSubmit={onSubmit}>
        <Input value={title} onChange={handleTitleChange} placeholder="Add new title" my={4}/>
        <Input value={note} onChange={handleNoteChange}placeholder="Add a new note" my={4}/>
        <Button bg="blue.500" color="white" type="submit" isLoading={loading} disabled={title === "" || note === ""}>
            Add Todo
        </Button>
        </form>    
        </AccordionPanel>    
         </AccordionItem>   
        </Accordion>
    )
}