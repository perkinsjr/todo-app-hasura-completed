import {gql} from "@apollo/client"

export const ADD_TODO = gql`mutation AddTodo($title: String!, $note: String!) {
    insert_todos_one(object: {title: $title, note:$note}){
          id
      title
      note
    }
  }`

export const GET_TODOS = gql`query GetTodos {
    todos(where: {completed: {_eq: false}}){
      id
      completed
      note
      title
      created_at
    }
  }
  `

  export const GET_COMPLETED_TODOS = gql`query GetCompletedTodos {
    todos(where: {completed: {_eq: true}}){
      id
      completed
      note
      title
      updated_at
    }
  }
  `

export const REMOVE_TODO = gql`
mutation removetodo($id: uuid!){
    delete_todos_by_pk(id: $id){
    id
    }
}
`
export const COMPLETE_TODO = gql`
  mutation COMPLETE_TODO($id: uuid = "") {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { completed: true }) {
      id
      
    }
  }
`;