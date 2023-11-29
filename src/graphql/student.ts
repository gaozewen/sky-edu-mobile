import { gql } from '@apollo/client'

export const STUDENT_REGISTER = gql`
  mutation studentRegister($params: StudentRegisterDTO!) {
    studentRegister(params: $params) {
      code
      message
    }
  }
`

export const STUDENT_LOGIN = gql`
  mutation studentLogin($params: StudentLoginDTO!) {
    studentLogin(params: $params) {
      code
      message
      data
    }
  }
`

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
