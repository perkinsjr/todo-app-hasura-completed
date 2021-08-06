import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Box,
    Heading
} from "@chakra-ui/react";

import {useQuery} from "@apollo/client";
import {GET_COMPLETED_TODOS} from "../../lib/queries";

export const CompletedTodos = () => {
    const {loading, error, data} = useQuery(GET_COMPLETED_TODOS);
    
    if(loading) return "Loading"
    if(error) return <div>{error}</div>

    return(
        <Box as="section" py="12">
         <Box 
            maxW={{
                base: "xl",
                md: "7xl"
            }}   
            mx="auto"
            px={{
                base: "6",
                md: "8",
            }}>
            <Box overflowX="auto">
                <Heading size="lg" mb="6">
                    Thing you have done!
                </Heading>
                <Table my="8" borderWidth="1px" fontSize="sm">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th whiteSpace="nowrap" scope="col">
                                Title
                            </Th>
                            <Th whiteSpace="nowrap" scope="col">
                                Note
                            </Th>
                            <Th whiteSpace="nowrap" scope="col">
                                Completed At
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.todos?.map((todo) => (
                            <Tr key={todo.id}>
                            <Td>{todo.title}</Td>
                            <Td>{todo.note}</Td>
                            <Td>{new Date(todo.updated_at).toLocaleDateString()}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            </Box>
        </Box>
    )
}