export interface IAuthService {
  //TOD: Adjust Return type
  generateToken: (userId: string, userEmail: string) => Promise<any>;
}
