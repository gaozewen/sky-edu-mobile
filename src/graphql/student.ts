import { gql } from '@apollo/client'

export const GET_STUDENT_BY_JWT = gql`
  query getStudentByJWT {
    getStudentByJWT {
      id
      tel
      nickname
      avatar
    }
  }
`
export const COMMIT_STUDENT = gql`
  mutation commitStudent($params: StudentDTO!) {
    commitStudent(params: $params) {
      code
      message
    }
  }
`
