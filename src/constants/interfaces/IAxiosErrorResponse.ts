export default interface IAxiosErrorResponse {
  data: {
    errors: {
      message: string
    }
  }
  status: number
}
