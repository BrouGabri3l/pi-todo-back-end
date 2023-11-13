// import { IActionResult } from "@/core/Action";
// import { ErrorType } from "@/domain/enums/ErrorType";
// import { TApplicationError } from "@/domain/Errors/ApplicationError";
// import { HttpStatusCode } from "@/services/http/HttpStatusCode";
// import { statusCodeToMessage } from "@/utils/http/HttpStatusToMessage";

// export default function handleError(error: TApplicationError): IActionResult {
//   let status = HttpStatusCode.INTERNAL_SERVER_ERROR;
//   let message = statusCodeToMessage(HttpStatusCode.INTERNAL_SERVER_ERROR);

//   if (error.type === ErrorType.FORBIDDEN) {
//     status = HttpStatusCode.FORBIDDEN;
//     message = statusCodeToMessage(HttpStatusCode.FORBIDDEN);
//   }

//   if (error.type === ErrorType.UNAUTHORIZED) {
//     status = HttpStatusCode.UNAUTHORIZED;
//     message = statusCodeToMessage(HttpStatusCode.UNAUTHORIZED);
//   }

//   if (error.type === ErrorType.VALIDATION) {
//     status = HttpStatusCode.UNPROCESSABLE_ENTITY;
//     message = statusCodeToMessage(HttpStatusCode.UNPROCESSABLE_ENTITY);
//   }

//   if (error.type === ErrorType.NOT_FOUND) {
//     status = HttpStatusCode.NOT_FOUND;
//     message = statusCodeToMessage(HttpStatusCode.NOT_FOUND);
//   }

//   if (error.type === ErrorType.NOT_ACCEPTABLE) {
//     status = HttpStatusCode.NOT_ACCEPTABLE;
//     message = statusCodeToMessage(HttpStatusCode.NOT_ACCEPTABLE);
//   }
//   return {
//     status,
//     body: {
//       status,
//       message,
//       errors: error.error,
//     },
//   };
// }
